import unittest
import parse_api


class ParameterTest(unittest.TestCase):
  example = [
      "type\n",
      "required String, in form\tType of activity. For example - Run, Ride etc.\n",
      "start_date_local\n",
      "Date, in query\tISO 8601 formatted date time.\n"
  ]

  def test_populates(self):
    param, index = parse_api.parse_param(self.example, 0)
    self.assertEqual(index, 2)
    self.assertEqual(param.name, 'type')
    self.assertEqual(param.required, True)
    self.assertEqual(param.kind, 'String')
    self.assertEqual(param.location, 'in form')
    self.assertEqual(param.description, 'Type of activity. For example - Run, Ride etc.')

  def test_populates_nonrequired(self):
    param, index = parse_api.parse_param(self.example, 2)
    self.assertEqual(index, 4)
    self.assertEqual(param.name, 'start_date_local')
    self.assertEqual(param.required, False)
    self.assertEqual(param.kind, 'Date')
    self.assertEqual(param.location, 'in query')
    self.assertEqual(param.description, 'ISO 8601 formatted date time.')


class RpcTest(unittest.TestCase):
  example = [
      "offset for test\n",
      "offset for test\n",
      "List Athlete Activities (getLoggedInAthleteActivities)\n",
      "Returns the activities of an athlete for a specific identifier.\n",
      "\n",
      "GET\n",
      "/athlete/activities\n",
      "Parameters\n",
      "type\n",
      "required String, in form\tType of activity. For example - Run, Ride etc.\n",
      "start_date_local\n",
      "Date, in query\tISO 8601 formatted date time.\n",
      "Responses\n",
      "SomeNextRpc",
      "\n",
  ]

  def test_populates(self):
    rpc, index = parse_api.parse_rpc(self.example, 2)
    self.assertEqual(index, 12)
    self.assertEqual(rpc.name, 'List Athlete Activities')
    self.assertEqual(rpc.key, 'getLoggedInAthleteActivities')
    self.assertEqual(rpc.description, 'Returns the activities of an athlete for a specific identifier.')
    self.assertEqual(rpc.method, 'GET')
    self.assertEqual(rpc.route, '/athlete/activities')


class FieldTest(unittest.TestCase):
  example = [
      "offset for test\n",
      "offset for test\n",
      "code\n",
      "string\tThe code associated with this error.\n",
  ]

  def test_populates(self):
    field, index = parse_api.parse_field(self.example, 2)
    self.assertEqual(index, 4)
    self.assertEqual(field.name, 'code')
    self.assertEqual(field.kind, 'string')
    self.assertEqual(field.description, 'The code associated with this error.')


class EnumTest(unittest.TestCase):
  example = [
      "offset for test\n",
      "offset for test\n",
      "ActivityType\n",
      "An enumeration of the types an activity may have.\n",
      "\n",
      "May be one of the following values: AlpineSki, BackcountrySki, Canoeing, Crossfit, EBikeRide, Elliptical, Golf, Handcycle, Hike, IceSkate, InlineSkate, Kayaking, Kitesurf, NordicSki, Ride, RockClimbing, RollerSki, Rowing, Run, Sail, Skateboard, Snowboard, Snowshoe, Soccer, StairStepper, StandUpPaddling, Surfing, Swim, Velomobile, VirtualRide, VirtualRun, Walk, WeightTraining, Wheelchair, Windsurf, Workout, Yoga\n",
      "\n",
  ]

  def test_populates(self):
    enum, index = parse_api.parse_enum(self.example, 2)
    self.assertEqual(index, 7)
    self.assertEqual(enum.name, 'ActivityType')
    self.assertEqual(enum.description, 'An enumeration of the types an activity may have.')
    self.assertEqual(enum.values, [
        "AlpineSki", "BackcountrySki", "Canoeing", "Crossfit", "EBikeRide",
        "Elliptical", "Golf", "Handcycle", "Hike", "IceSkate", "InlineSkate",
        "Kayaking", "Kitesurf", "NordicSki", "Ride", "RockClimbing", "RollerSki",
        "Rowing", "Run", "Sail", "Skateboard", "Snowboard", "Snowshoe", "Soccer",
        "StairStepper", "StandUpPaddling", "Surfing", "Swim", "Velomobile",
        "VirtualRide", "VirtualRun", "Walk", "WeightTraining", "Wheelchair",
        "Windsurf", "Workout", "Yoga"
    ])

class ModelTest(unittest.TestCase):
  example = [
      "offset for test\n",
      "offset for test\n",
      "ActivityTotal\n",
      "A roll-up of metrics pertaining to a set of activities. Values are in seconds and meters.\n",
      "\n",
      "count\n",
      "integer	The number of activities considered in this total.\n",
      "distance\n",
      "float	The total distance covered by the considered activities.\n",
      "NextRandomModel\n",
  ]

  def test_populates(self):
    model, index = parse_api.parse_model(self.example, 2)
    self.assertEqual(index, 9)
    self.assertEqual(model.name, "ActivityTotal")
    self.assertEqual(model.description, "A roll-up of metrics pertaining to a set of activities. Values are in seconds and meters.")
    self.assertEqual(len(model.fields), 2)
    self.assertEqual(model.fields[0].name, 'count')

class ApiTest(unittest.TestCase):
  example = [
      "offset for test\n",
      "offset for test\n",
      "BeginBlock",
      "List Athlete Activities (getLoggedInAthleteActivities)\n",
      "Returns the activities of an athlete for a specific identifier.\n",
      "\n",
      "GET\n",
      "/athlete/activities\n",
      "Parameters\n",
      "type\n",
      "required String, in form\tType of activity. For example - Run, Ride etc.\n",
      "start_date_local\n",
      "Date, in query\tISO 8601 formatted date time.\n",
      "Responses\n",
      "All Models",
      "ActivityTotal\n",
      "A roll-up of metrics pertaining to a set of activities. Values are in seconds and meters.\n",
      "\n",
      "count\n",
      "integer	The number of activities considered in this total.\n",
      "distance\n",
      "float	The total distance covered by the considered activities.\n",
  ]

  def test_populates(self):
    api = parse_api.parse_api(self.example, 'BeginBlock')
    self.assertEqual(len(api.rpcs), 1)
    self.assertEqual(api.rpcs[0].key, "getLoggedInAthleteActivities")
    self.assertEqual(len(api.models), 1)
    self.assertEqual(api.models[0].name, "ActivityTotal")
