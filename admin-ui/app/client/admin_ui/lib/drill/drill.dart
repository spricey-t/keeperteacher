
class Drill {

  String id;
  String name;
  String videoUrl;
  String schematicUrl;

  Drill() {}
  Drill.fromMap(Map data) {
    id = data['_id'];
    name = data['name'];
    videoUrl = data['videoUrl'];
    schematicUrl = data['schematicUrl'];
  }
}