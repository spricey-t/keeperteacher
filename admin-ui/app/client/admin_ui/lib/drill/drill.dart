
class Drill {

  String name;
  String videoUrl;
  String schematicUrl;

  Drill() {}
  Drill.withName(this.name);
  Drill.fromMap(Map data) {
    name = data['name'];
    videoUrl = data['videoUrl'];
    schematicUrl = data['schematicUrl'];
  }
}