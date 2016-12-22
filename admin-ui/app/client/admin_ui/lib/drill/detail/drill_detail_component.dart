
import 'dart:async';
import 'package:angular2/core.dart';
import 'package:angular2/router.dart';
import 'package:angular2/platform/common.dart';
import 'package:admin_ui/drill/drill_service.dart';
import 'package:admin_ui/drill/drill.dart';


@Component(
    selector: 'kt-drill-detail',
    templateUrl: 'drill_detail_component.html',
    styleUrls: const ['drill_detail_component.css'],
//    directives: const [],
    providers: const [DrillService]
)
class DrillDetailComponent implements OnInit, AfterViewInit {

  final DrillService _drillService;
  final RouteParams _routeParams;
  final Location _location;
  final Router _router;
  String drillId;
  Drill drill;
  @ViewChild('objective') ElementRef objectiveElement;

  DrillDetailComponent(this._drillService, this._routeParams, this._location, this._router);

  void goBack() => _location.back();

  void returnToDrills() {
    _router.navigate([
      'Drills'
    ]);
  }

  @override
  ngOnInit() {
    _loadDrill();
  }

  @override
  ngAfterViewInit() {
    print(objectiveElement);
  }

  void _loadDrill() {
    _drillService.getDrill(_routeParams.get('drillId')).then((drill) {
      this.drill = drill;
    });
  }
}