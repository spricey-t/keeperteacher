
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill_list_component.dart';
import 'package:admin_ui/drill/drill_detail_component.dart';
import 'package:admin_ui/drill/drill.dart';

@Component(
    selector: 'kt-drill-app',
    templateUrl: 'drill_app_component.html',
    styleUrls: const ['drill_app_component.css'],
    directives: const [DrillListComponent, DrillDetailComponent]
)
class DrillAppComponent {

  Drill selectedDrill;

  void onDrillListNotify(var drill) {
    selectedDrill = drill;
  }
}