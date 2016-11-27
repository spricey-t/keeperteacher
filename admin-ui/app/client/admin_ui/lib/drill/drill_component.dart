
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';

@Component(
    selector: 'kt-drill',
    template: '<div>drill</div>'
)
class DrillComponent {

  @Input() Drill drill;
}