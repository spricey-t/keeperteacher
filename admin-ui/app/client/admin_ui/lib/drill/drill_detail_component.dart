
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';

@Component(
    selector: 'kt-drill-detail',
    templateUrl: 'drill_detail_component.html'
)
class DrillDetailComponent {

  @Input() Drill drill;
}