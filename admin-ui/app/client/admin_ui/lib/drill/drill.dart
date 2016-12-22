
class Drill {

  String id;
  String name;
  String category;
  String objective;
  String videoUrl;
  String schematicUrl;

  Drill() {}
  Drill.fromMap(Map data) {
    id = data['_id'];
    name = data['name'];
    category = data['category'];
    objective = data['objective'];
    videoUrl = data['videoUrl'];
    schematicUrl = data['schematicUrl'];
  }
}