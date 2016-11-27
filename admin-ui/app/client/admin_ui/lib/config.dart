

final Config config = new Config._private();

class Config {

  static const String API_HOST = 'http://localhost:10864/api/v2';
  static const String DRILL_SERVICE_ENDPOINT = '${API_HOST}/drillservice';


  factory Config() {
    return config;
  }

  Config._private() {
  }
}