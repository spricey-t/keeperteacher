
import 'package:angular2/core.dart';
import 'package:angular2/router.dart';
import 'package:angular2/platform/common.dart';


@Component(
    selector: 'kt-drill-detail',
    templateUrl: 'drill_detail_component.html',
    styleUrls: const ['drill_detail_component.css']
)
class DrillDetailComponent implements OnInit {

  final RouteParams _routeParams;
  final Location _location;
  String drillId;

  DrillDetailComponent(this._routeParams, this._location) {
  }

  void goBack() => _location.back();

  @override
  ngOnInit() {
    drillId = _routeParams.get('drillId') ?? '';
  }
}