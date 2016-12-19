import 'package:angular2/core.dart';

import 'package:admin_ui/drill/drill.dart';

@Injectable()
class DrillSearchService {


  List<Drill> searchDrills(final List<Drill> sourceDrills, final String searchString) {
    if(searchString == null || searchString.isEmpty || sourceDrills.isEmpty) {
      return sourceDrills;
    }
    List<String> searchTerms = searchString.trim().split(" ").map((term) { return term.toLowerCase(); }).toList();
    return _filterDrillsOnSearchTerms(sourceDrills, searchTerms);
  }


  List<Drill> _filterDrillsOnSearchTerms(final List<Drill> sourceDrills, final List<String> searchTerms) {
    List<Drill> filteredDrills = new List();
    sourceDrills.forEach((sourceDrill) {
      for(String sourceString in _getSourceStringsFromSourceDrill(sourceDrill)) {
        if(_searchTermsMatch(sourceString, searchTerms)) {
          filteredDrills.add(sourceDrill);
          break;
        }
      }
    });
    return filteredDrills;
  }

  List<String> _getSourceStringsFromSourceDrill(Drill sourceDrill) {
    return new List()
        ..add(sourceDrill.name);
  }

  bool _searchTermsMatch(String sourceString, List<String> searchTerms) {
    sourceString = sourceString.toLowerCase();
    for(String searchTerm in searchTerms) {
      if(!sourceString.contains(searchTerm)) {
        return false;
      }
    }
    return true;
  }
}