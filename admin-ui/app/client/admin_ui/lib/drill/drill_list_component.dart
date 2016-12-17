
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';
import 'package:admin_ui/drill/drill_component.dart';
import 'package:admin_ui/drill/drill_service.dart';


@Component(
    selector: 'kt-drill-list',
    templateUrl: 'drill_list_component.html',
    styleUrls: const ['drill_list_component.css'],
    directives: const [DrillComponent],
    providers: const [DrillService]
)
class DrillListComponent implements OnInit {

  final List<Drill> drills;
  final DrillService _drillService;
  Drill selectedDrill;

  DrillListComponent(this._drillService) : drills = new List() {
  }

  void loadDrills() {
    this.drills.clear();
    _drillService
        .listDrills()
        .then((drills) {
          this.drills.addAll(drills);
          return drills;
        });
  }

  @override
  ngOnInit() {
    loadDrills();
  }
}