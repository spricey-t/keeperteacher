
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';
import 'package:admin_ui/drill/list/drill_component.dart';
import 'package:admin_ui/drill/drill_service.dart';
import 'package:admin_ui/drill/list/search/drill_search_service.dart';


@Component(
    selector: 'kt-drill-list',
    templateUrl: 'drill_list_component.html',
    styleUrls: const ['drill_list_component.css'],
    directives: const [DrillComponent],
    providers: const [DrillService, DrillSearchService]
)
class DrillListComponent implements OnInit {

  final List<Drill> drills;
  final List<Drill> filteredDrills;
  final DrillService _drillService;
  final DrillSearchService _drillSearchService;
  Drill selectedDrill;
  String searchTerm;

  DrillListComponent(this._drillService, this._drillSearchService) :
        drills = new List(),
        filteredDrills = new List() {
  }

  void loadDrills() {
    this.drills.clear();
    _drillService
        .listDrills()
        .then((drills) {
          print(drills[0].schematicUrl);
          this.drills.addAll(drills);
          resetFilteredDrills();
          return drills;
        });
  }

  void search(String searchString) {
    filteredDrills.clear();
    filteredDrills.addAll(_drillSearchService.searchDrills(drills, searchString));
  }

  void resetFilteredDrills() {
    filteredDrills.clear();
    filteredDrills.addAll(drills);
  }

  @override
  ngOnInit() {
    loadDrills();
  }
}