"""Builds a TS Strava API based on a copy-paste of the activity models."""
import attr


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


@attr.s
class Api(object):
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


def parse_api(lines, first_header):
  index = 0
  # Skip to the first section header
  while lines[index].strip() != first_header:
    index += 1
  rpcs, index = parse_rpcs(lines, index)
  models, index = parse_models(lines, index)
  return Api(rpcs=rpcs, models=models)


def parse_rpcs(lines, index):
  rpcs = []
  while lines[index].strip() != 'All Models':
    if '(' not in lines[index].strip():
      index += 1  # Skip headers
    (rpc, index) = parse_rpc(lines, index)
    rpcs.append(rpc)
  return rpcs, index


def parse_rpc_name(line):
  return line.rstrip(')').split(' (')


def parse_param(lines, index):
  name = lines[index].strip()

  detail = lines[index + 1].strip()
  modifiers, rest = detail.split(',', 1)

  required = modifiers.startswith('required')
  kind = modifiers.split(' ')[-1]

  location, description = rest.split('\t')
  param = Parameter(
      name=name,
      required=required,
      kind=kind,
      location=location,
      description=description,
  )
  return param, index + 2


def parse_rpc_params(lines, index):
  # Some rpcs don't have params.
  if lines[index].strip() != 'Parameters':
    return [], index
  index += 1
  params = []
  while lines[index].strip() != 'Responses':
    param, index = parse_param(lines, index)
    params.append(param)
  return params, index


def skip_to_next_rpc(lines, index):
  while lines[index].strip():
    if lines[index].strip() == 'All Models':
      return index  # Break out, end of RPCs
    index += 1
  return index - 2


def parse_rpc(lines, index):
  name, key = parse_rpc_name(lines[index].strip())
  description = lines[index + 1].strip()
  # Skip blank line at 2
  method = lines[index + 3].strip()
  route = lines[index + 4].strip()
  params, index = parse_rpc_params(lines, index + 5)
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
  kind, description = lines[index + 1].strip().split('\t')
  field = Field(name=name, kind=kind, description=description)
  return field, index + 2


def parse_enum(lines, index):
  name = lines[index].strip()
  description = lines[index + 1].strip()
  # Skip blank line at 2
  content = lines[index + 3].lstrip('May be one of the following values: ')
  values = content.strip().split(', ')
  enum = Enum(
      name=name,
      description=description,
      values=values,
  )
  # Skip blank line at 4
  return enum, index + 5


def parse_model(lines, index):
  if lines[index + 3].strip().startswith('May be one of the following values'):
    return parse_enum(lines, index)
  name = lines[index].strip()
  description = lines[index + 1].strip()
  # Skip blank line at 2
  index = index + 3
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
  index += 1
  models = []
  while len(lines) > index:
    model, index = parse_model(lines, index)
    models.append(model)
  return models, index


if __name__ == '__main__':
  with open('api.txt', 'r') as api_file:
    lines = api_file.readlines()
  print(parse_api(lines, 'Activities'))
