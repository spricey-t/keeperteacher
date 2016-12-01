
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
  @Output() EventEmitter<Drill> drillListNotify = new EventEmitter();

  DrillListComponent(this._drillService) : drills = new List() {
  }

  void loadDrills() {
    this.drills.clear();
    _drillService
        .listDrills()
        .then((drills) {
          this.drills.addAll(drills);
          return drills;
        })
        .then((drills) {
          if(drills.isNotEmpty) {
            selectDrill(drills[0]);
          }
        });
  }

  void selectDrill(Drill drill) {
    selectedDrill = drill;
    print('emitted drill');
    drillListNotify.emit(drill);
  }

  bool isSelected(Drill drill) {
    return drill == selectedDrill;
  }

  @override
  ngOnInit() {
    loadDrills();
  }
}