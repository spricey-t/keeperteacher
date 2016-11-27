
import 'dart:html';
import 'dart:async';
import 'dart:convert';
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';
import 'package:admin_ui/config.dart';

@Injectable()
class DrillService {

  final Config config = new Config();

  Future<List<Drill>> listDrills() async {
    return await HttpRequest
        .getString('${Config.DRILL_SERVICE_ENDPOINT}/drills')
        .then((result) {
          List<Drill> drills = new List();
          JSON.decode(result).forEach((drill) {
            drills.add(new Drill.fromMap(drill));
          });
          return drills;
        });
  }
}