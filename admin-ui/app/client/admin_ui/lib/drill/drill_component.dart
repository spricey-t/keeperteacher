
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';

@Component(
    selector: 'kt-drill',
    templateUrl: 'drill_component.html',
    styleUrls: const ['drill_component.css']
)
class DrillComponent {

  @Input() Drill drill;
}