"""Builds a TS API based on a copy-paste of the swagger docs."""
import attr
import re

API_PREFIX = "${PROXY}"


@attr.s
class Parameter(object):
  name = attr.ib()
  required = attr.ib()
  kind = attr.ib()
  location = attr.ib()
  description = attr.ib()


@attr.s
class Rpc(object):
  name = attr.ib()
  key = attr.ib()
  description = attr.ib()
  method = attr.ib()
  route = attr.ib()
  params = attr.ib()
  return_type = 'NOT_IMPLEMENTED'
  sample_response = 'NOT_IMPLEMENTED'

  def params_by_location(self, location):
    return [p for p in self.params if p.location == location]


@attr.s
class Api(object):
  name = attr.ib()
  rpcs = attr.ib()
  models = attr.ib()


@attr.s
class Model(object):
  name = attr.ib()
  description = attr.ib()
  fields = attr.ib()


@attr.s
class Field(object):
  name = attr.ib()
  kind = attr.ib()
  description = attr.ib()


@attr.s
class Enum(object):
  name = attr.ib()
  description = attr.ib()
  values = attr.ib()

def next_index(lines, index):
  index += 1
  while len(lines) > index and not lines[index].strip():
    index += 1
  return index

def parse_api(lines, first_header):
  index = 0
  # Skip to the first section header
  while lines[index].strip() != first_header:
    index = next_index(lines, index)
  rpcs, index = parse_rpcs(lines, index)
  models, index = parse_models(lines, index)
  return Api(name='Strava', rpcs=rpcs, models=models)


def parse_rpcs(lines, index):
  rpcs = []
  while lines[index].strip() != 'All Models':
    if '(' not in lines[index].strip():
      index = next_index(lines, index)
    (rpc, index) = parse_rpc(lines, index)
    rpcs.append(rpc)
  return rpcs, index


def parse_rpc_name(line):
  return line.rstrip(')').split(' (')


def parse_param(lines, index):
  name = lines[index].strip()

  index = next_index(lines, index)
  detail = lines[index].strip()
  modifiers, rest = detail.split(',', 1)

  required = modifiers.startswith('required')
  kind = modifiers.split(' ')[-1]

  location, description = rest.split('\t')
  param = Parameter(
      name=name,
      required=required,
      kind=kind.lstrip('#/'),
      location=location.strip(),
      description=description,
  )
  index = next_index(lines, index)
  return param, index


def parse_rpc_params(lines, index):
  # Some rpcs don't have params.
  if lines[index].strip() != 'Parameters':
    return [], index
  index = next_index(lines, index)
  params = []
  while lines[index].strip() != 'Responses':
    param, index = parse_param(lines, index)
    params.append(param)
  return params, index


def skip_to_next_rpc(lines, index):
  while not re.match(r'[\w\s]+\(\w+\)', lines[index].strip()):
    if lines[index].strip() == 'All Models':
      return index  # Break out, end of RPCs
    index = next_index(lines, index)
  return index


def parse_rpc(lines, index):
  name, key = parse_rpc_name(lines[index].strip())
  index = next_index(lines, index)
  if lines[index].strip()[0].islower():
    description = '(no API description)'
  else:
    description = lines[index].strip()
    index = next_index(lines, index)
  method = lines[index].strip()
  index = next_index(lines, index)
  route = lines[index].strip()
  index = next_index(lines, index)
  params, index = parse_rpc_params(lines, index)
  index = skip_to_next_rpc(lines, index)
  rpc = Rpc(
      name=name,
      key=key,
      description=description,
      method=method,
      route=route,
      params=params,
  )
  return rpc, index


def parse_field(lines, index):
  name = lines[index].strip()
  index = next_index(lines, index)
  kind, description = lines[index].strip().split('\t')
  field = Field(name=name, kind=kind.lstrip('#/'), description=description)
  index = next_index(lines, index)
  return field, index


def parse_enum(lines, index, name, description):
  content = lines[index][len('May be one of the following values: '):]
  values = content.strip().split(', ')
  enum = Enum(
      name=name,
      description=description,
      values=values,
  )
  index = next_index(lines, index)
  return enum, index


def parse_model(lines, index):
  name = lines[index].strip()
  index = next_index(lines, index)
  if lines[index].strip()[0].islower():
    description = '(no API description)'
  else:
    description = lines[index].strip()
    index = next_index(lines, index)
  if lines[index].strip().startswith('May be one of the following values'):
    return parse_enum(lines, index, name, description)
  fields = []
  # Continue getting fields until we hit a class (has titlecase name).
  while len(lines) > index and lines[index][0].islower():
    field, index = parse_field(lines, index)
    fields.append(field)
  model = Model(
      name=name,
      description=description,
      fields=fields
  )
  return model, index


def parse_models(lines, index):
  index = next_index(lines, index)
  models = []
  while len(lines) > index:
    model, index = parse_model(lines, index)
    models.append(model)
  return models, index


def tsify_param(param, termination):
  maybe_mod = "" if param.required else "?"
  array_mod = "[]" if param.description.startswith('A collection of') else ''
  return f"""/** {param.description} */
    {param.name}{maybe_mod}: {tsify_kind(param.kind)}{array_mod}{termination}"""


def tsify_rpc_abstract(rpc):
  return f"""abstract {tsify_rpc_signature(rpc)};"""


def tsify_rpc_mock(rpc):
  return f"""{tsify_rpc_signature(rpc)} {{
      return of(
        {rpc.sample_response} as {rpc.return_type}
      )
    }}"""


def tsify_rpc_http(rpc):
  route = rpc.route.replace('{', '${')
  return f"""{tsify_rpc_signature(rpc)} {{
      const params = toParams(query);
      return this.httpClient.{rpc.method.lower()}<{rpc.return_type}>(
        `{API_PREFIX}{route}`
        {{
          params,
        }}
      );
    }}"""


def tsify_rpc_signature(rpc):
  query_params = rpc.params_by_location('in query')
  if not query_params:
    ts_query = ""
  else:
    query_modifiers = '' if any(p.required for p in query_params) else '?'
    ts_query_params = '\n'.join([tsify_param(p, ';') for p in query_params])
    ts_query = f"""query{query_modifiers}: {{
        {ts_query_params}
      }},"""
  path_params = rpc.params_by_location('in path')
  ts_path_params = '\n'.join([tsify_param(p, ',') for p in path_params])
  return f"""{rpc.key}(
      {ts_path_params}
      {ts_query}
    ): Observable<{rpc.return_type}>"""


def tsify_imports(api):
  pass

def tsify_service_mock(api):
  title = api.name.title()
  lower = api.name.lower()
  tsified_rpcs = '\n\n'.join(tsify_rpc_mock(rpc) for rpc in api.rpcs)
  return f"""/** Contains the Mock Service for {api.name} API. */
    import {{ Injectable }} from '@angular/core';
    import {{ {title}Service }} from './{lower}.service';
    {tsify_imports(api)}
    import {{ Observable, of }} from 'rxjs';

    /** Mock Service for {api.name} API. */
    @Injectable({{ providedIn: 'root', }})
    export class {title}MockService extends {title}Service {{
      {tsified_rpcs}
    }}"""


def tsify_service_abstract(api):
  title = api.name.title()
  lower = api.name.lower()
  tsified_rpcs = '\n\n'.join(tsify_rpc_abstract(rpc) for rpc in api.rpcs)
  return f"""/** Contains the abstract Service for {api.name} API. */
    {tsify_imports(api)}
    import {{ Observable }} from 'rxjs';

    /** Abstract Service for {api.name} API. */
    export abstract class {title}Service {{
      {tsified_rpcs}
    }}"""


def tsify_service_http(api):
  title = api.name.title()
  lower = api.name.lower()
  tsified_rpcs = '\n\n'.join(tsify_rpc_http(rpc) for rpc in api.rpcs)
  return f"""/** Contains the HTTP Service for {api.name} API. */
    import {{ HttpClient }} from '@angular/common/http';
    import {{ Injectable }} from '@angular/core';
    import {{ Observable }} from 'rxjs';
    import {{ PROXY, toParams }} from './api-util';
    {tsify_imports(api)}
    import {{ {title}Service }} from './{lower}.service';

    /** HTTP Service for {api.name} API. */
    @Injectable({{ providedIn: 'root', }})
    export class {title}MockService extends {title}Service {{
      constructor(private readonly httpClient: HttpClient) {{
        super();
      }}

      {tsified_rpcs}
    }}"""


def tsify_data(api):
  tsified_models = '\n\n'.join(tsify_model(model) for model in api.models)
  return f"""/** Contains the data models for {api.name} API. */\n
    {tsified_models}"""


def tsify_api(api):
  data = tsify_data(api)
  service_abstract = tsify_service_abstract(api)
  service_http = tsify_service_http(api)
  service_mock = tsify_service_mock(api)

  with open(f'{api.name.lower()}.ts', 'w') as f:
    f.write(data)
  with open(f'{api.name.lower()}.service.ts', 'w') as f:
    f.write(service_abstract)
  with open(f'{api.name.lower()}-http.service.ts', 'w') as f:
    f.write(service_http)
  with open(f'{api.name.lower()}-mock.service.ts', 'w') as f:
    f.write(service_mock)
  print('wrote data')

def tsify_kind(kind):
  if kind.startswith('array'):
    inner_start = kind.find('[') + 1
    inner_stop = kind.rfind(']')
    inner_kind = kind[inner_start:inner_stop]
    return f'{tsify_kind(inner_kind)}[]'
  lowerkind = kind.lower()
  if lowerkind in ['datetime', 'date']:
    return 'string'
  if lowerkind in ['integer', 'long', 'float', 'double']:
    return 'number'
  return kind

def tsify_model(model):
  if isinstance(model, Enum):
    return tsify_enum(model)
  # Special cases.
  if model.description.startswith('A collection of'):
    kind = model.description[len('A collection of '):].lstrip('#/').split(' ')[0]
    print('boop', kind)
    ts_body = f'type {model.name} = {tsify_kind(kind)}[];'
  else:
    tsified_fields = "\n".join(tsify_field(field) for field in model.fields)
    ts_body = f"""export declare interface {model.name} {{
      {tsified_fields}
    }}"""
  return f"""/** {model.description} */
    {ts_body}"""


def tsify_field(field):
  array_mod = "[]" if field.description.startswith('A collection of') else ''
  return f"""/** {field.description} */
    {field.name}: {tsify_kind(field.kind)}{array_mod};"""


def tsify_enum(enum):
  formatted_values = [f"'{value}', " for value in enum.values]
  camel_name = enum.name[0].lower() + enum.name[1]
  return f"""/** {enum.description} */
    export const {camel_name} = [
      {formatted_values}
    ] as const;
    /** {enum.description} */
    export type {enum.name} = typeof {camel_name}[number];"""


if __name__ == '__main__':
  with open('api.txt', 'r') as api_file:
    lines = api_file.readlines()
  api = parse_api(lines, 'Activities')
  kinds = set()
  for model in api.models:
    if isinstance(model, Enum):
      continue
    for field in model.fields:
      kinds.add(field.kind)
  for rpc in api.rpcs:
    for param in rpc.params:
      kinds.add(param.kind)
  tsify_api(api)
