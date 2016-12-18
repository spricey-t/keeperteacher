
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
  final List<Drill> filteredDrills;
  final DrillService _drillService;
  Drill selectedDrill;
  String searchTerm;

  DrillListComponent(this._drillService) :
        drills = new List(),
        filteredDrills = new List() {
  }

  void loadDrills() {
    this.drills.clear();
    _drillService
        .listDrills()
        .then((drills) {
          this.drills.addAll(drills);
          resetFilteredDrills();
          return drills;
        });
  }

  void search(String searchTerm) {
    print(searchTerm);
    if(searchTerm == null || searchTerm.isEmpty) {
      resetFilteredDrills();
      return;
    }
    List<Drill> temp = new List();
    drills.forEach((drill) {
      List<String> sources = new List()
        ..add(drill.name);
      if(_stringMatch(sources, searchTerm)) {
        temp.add(drill);
      }
    });
    filteredDrills.clear();
    filteredDrills.addAll(temp);
    print(filteredDrills);
  }

  void resetFilteredDrills() {
    filteredDrills.clear();
    filteredDrills.addAll(drills);
  }

  @override
  ngOnInit() {
    loadDrills();
  }

  bool _stringMatch(List<String> sources, String searchTerm) {
    List<String> cleanSources = new List();
    sources.forEach((source) {cleanSources.add(source.toLowerCase());});
    List<String> terms = searchTerm.toLowerCase().split(" ");
    for(String term in terms) {
      bool sourceMatched = false;
      for(String source in cleanSources) {
        if(source.contains(term)) {
          sourceMatched = true;
          break;
        }
      }
      if(!sourceMatched) {
        return false;
      }
    }
    return true;
  }
}