
import 'package:admin_ui/drill/drill.dart';
import 'package:admin_ui/drill/list/drill_component.dart';
import 'package:angular2/core.dart';


@Component(
    selector: 'kt-drill-list',
    templateUrl: 'drill_list_component.html',
    styleUrls: const ['drill_list_component.css'],
    directives: const [DrillComponent],
    providers: const []
)
class DrillListComponent implements OnInit {

  @Input() List<Drill> drills;
  @Output() EventEmitter<String> drillNotify = new EventEmitter();

  @override
  ngOnInit() {
    print(drills);
  }

  void drillSelected(String drillId) {
    drillNotify.emit(drillId);
  }
}