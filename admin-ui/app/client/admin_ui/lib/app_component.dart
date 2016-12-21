// Copyright (c) 2016, frejya. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'package:admin_ui/drill/drill_app_component.dart';
import 'package:admin_ui/drill/detail/drill_detail_component.dart';

@Component(
    selector: 'my-app',
    styleUrls: const ['app_component.css'],
    templateUrl: 'app_component.html',
    directives: const [ROUTER_DIRECTIVES],
    providers: const [ROUTER_PROVIDERS]
)
@RouteConfig(const[
  const Route(path: '', name: 'Drills', component: DrillAppComponent, useAsDefault: true),
  const Route(path: '/drills/:drillId', name: 'DrillDetail', component: DrillDetailComponent)
])
class AppComponent {}
