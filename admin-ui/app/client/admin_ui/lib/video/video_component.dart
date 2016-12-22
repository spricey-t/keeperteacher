import 'dart:js';
import 'package:angular2/core.dart';


@Component(
    selector: 'kt-video',
    templateUrl: 'video_component.html',
    styleUrls: const ['video_component.css']
)
class VideoComponent implements AfterViewInit {

  @Input() String videoUrl;

  @override
  ngAfterViewInit() {
    context.callMethod('playVideo', ['video', 'https://s3-us-west-2.amazonaws.com/keeperteacher/5695be1e08a03be332695631/index.m3u8']);
//    context.callMethod('playVideo', [videoUrl]);
  }
}