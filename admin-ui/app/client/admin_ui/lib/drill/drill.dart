
class Drill {

  String name;

  Drill() {}
  Drill.withName(this.name);
  Drill.fromMap(Map data) {
    name = data['name'];
  }
}