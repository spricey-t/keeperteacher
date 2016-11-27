
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';
import 'package:admin_ui/drill/drill_component.dart';
import 'package:admin_ui/drill/drill_service.dart';


@Component(
    selector: 'kt-drill-list',
    templateUrl: 'drill_list_component.html',
    directives: const [DrillComponent],
    providers: const [DrillService]
)
class DrillListComponent implements OnInit {

  List<Drill> drills;
  final DrillService _drillService;

  DrillListComponent(this._drillService) {
  }

  void loadDrills() {
    _drillService
        .listDrills()
        .then((drills) {
          this.drills = drills;
        });
  }

  @override
  ngOnInit() {
    loadDrills();
  }
}