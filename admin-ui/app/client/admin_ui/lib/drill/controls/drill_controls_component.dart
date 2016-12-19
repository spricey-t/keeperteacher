import 'package:angular2/core.dart';
import 'package:admin_ui/drill/drill_search_service.dart';
import 'package:admin_ui/drill/drill.dart';

@Component(
    selector: 'kt-drill-controls',
    templateUrl: 'drill_controls_component.html',
    styleUrls: const ['drill_controls_component.css'],
    directives: const [],
    providers: const [DrillSearchService]
)
class DrillControlsComponent {

  final DrillSearchService _drillSearchService;

  @Input() List<Drill> drills;
  @Output() EventEmitter<List<Drill>> filterNotify = new EventEmitter();

  DrillControlsComponent(this._drillSearchService) {
  }


  void search(String searchText) {
    // todo add debounce
    List<Drill> filtered= _drillSearchService.searchDrills(drills, searchText);
    filterNotify.emit(filtered);
  }
}