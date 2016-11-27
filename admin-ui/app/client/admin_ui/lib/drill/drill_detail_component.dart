
import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';

@Component(
    selector: 'kt-drill-detail',
    template: '<div>hello there {{ drill.name }}</div>'
)
class DrillDetailComponent {

  @Input() Drill drill;
}