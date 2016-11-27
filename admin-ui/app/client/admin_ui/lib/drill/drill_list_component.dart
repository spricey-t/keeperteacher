
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

  List<Drill> drills;
  final DrillService _drillService;
  Drill selectedDrill;
  @Output() EventEmitter<Drill> drillListNotify = new EventEmitter();

  DrillListComponent(this._drillService) {
  }

  void loadDrills() {
    _drillService
        .listDrills()
        .then((drills) {
          this.drills = drills;
        });
  }

  void selectDrill(Drill drill) {
    selectedDrill = drill;
    print('emitted drill');
    drillListNotify.emit(drill);
  }

  @override
  ngOnInit() {
    loadDrills();
  }
}