import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {NavigationService} from "../navigation-service";


@Injectable()
export class NavigationServiceMock extends NavigationService {

  getNavigation(): Observable<any> {
    let mockContext = require.context(
      "../../../mock/content", true, /.*\.json/);

    let mockContent = mockContext.keys().map(mockContext);

    let children = [];
    let p: any;
    for (p of mockContent) {
      children.push({
        childNodes: [],
        _id: p.id,
        title: (p.title) ? p.title : p.id,
        translated: true
      })
    }

    let main = [{
      title: 'Mock Content Navigation',
      _id: 'home_de',
      childNodes: children
    }];

    return new Observable(observer => {
      observer.next({page: {"_id": "main_de", childNodes: main}});
    });
  }


  result = '{"page":{ "tk_id": "home_de", "tk_type" : "allinonenavigation", "isRoot" : true, "language" : "DE", "pageContentId": "759641", "childNodes": [{"_id": "content_page_1_de", "pageContentId": "754227", "translated":"true", "title": "Treppenlift", "childNodes": [{"_id": "content_page_2_de", "pageContentId": "754255", "translated":"true", "title": "Kurvige Treppen", "childNodes": []},{"_id": "levant___gerade_treppen_de", "pageContentId": "754563", "translated":"true", "title": "Gerade Treppen", "childNodes": []},{"_id": "levant___gerade_treppen_2_de", "pageContentId": "754338", "translated":"true", "title": "Für den Aussenbereich", "childNodes": []},{"_id": "3d_app_12numpk660du0_de", "pageContentId": "760615", "translated":"true", "title": "3D App", "childNodes": []}]},{"_id": "content_page_15_de", "pageContentId": "754672", "translated":"true", "title": "Plattformlift", "childNodes": [{"_id": "content_page_16_de", "pageContentId": "754753", "translated":"true", "title": "Kurvige Treppen", "childNodes": []},{"_id": "levant___gerade_treppen_3_de", "pageContentId": "754667", "translated":"true", "title": "Gerade Treppen", "childNodes": []},{"_id": "levant___gerade_treppen_4_de", "pageContentId": "754683", "translated":"true", "title": "Geringfügige Höhen", "childNodes": []},{"_id": "levant___gerade_treppen_25_de", "pageContentId": "786177", "translated":"true", "title": "Kurvige Treppen mit variabler Steigung", "childNodes": []}]},{"_id": "content_page_3_de", "pageContentId": "754370", "translated":"true", "title": "Beratung vor Ort", "childNodes": [{"_id": "content_page_180_de", "pageContentId": "760095", "translated":"true", "title": "Baden Württemberg", "childNodes": []},{"_id": "content_page_181_de", "pageContentId": "760133", "translated":"true", "title": "Bayern", "childNodes": []},{"_id": "content_page_185_de", "pageContentId": "760205", "translated":"true", "title": "Berlin", "childNodes": []},{"_id": "content_page_187_de", "pageContentId": "760241", "translated":"true", "title": "Brandenburg", "childNodes": []},{"_id": "content_page_189_de", "pageContentId": "760258", "translated":"true", "title": "Bremen", "childNodes": []},{"_id": "content_page_191_de", "pageContentId": "760290", "translated":"true", "title": "Hamburg", "childNodes": []},{"_id": "content_page_190_de", "pageContentId": "760283", "translated":"true", "title": "Hessen", "childNodes": []},{"_id": "content_page_192_de", "pageContentId": "760306", "translated":"true", "title": "Mecklenburg - Vorpommern", "childNodes": []},{"_id": "content_page_197_de", "pageContentId": "760339", "translated":"true", "title": "Niedersachsen", "childNodes": []},{"_id": "content_page_193_de", "pageContentId": "760319", "translated":"true", "title": "Nordrhein Westfalen", "childNodes": []},{"_id": "content_page_196_de", "pageContentId": "760330", "translated":"true", "title": "Rheinland Pfalz", "childNodes": []},{"_id": "content_page_188_de", "pageContentId": "760246", "translated":"true", "title": "Saarland", "childNodes": []},{"_id": "content_page_14_de", "pageContentId": "760224", "translated":"true", "title": "Sachsen", "childNodes": []},{"_id": "content_page_184_de", "pageContentId": "760180", "translated":"true", "title": "Sachsen Anhalt", "childNodes": []},{"_id": "content_page_183_de", "pageContentId": "760166", "translated":"true", "title": "Schleswig Holstein", "childNodes": [{"_id": "content_page_105_de", "pageContentId": "757108", "translated":"true", "title": "Wentdorf", "childNodes": []}]},{"_id": "content_page_182_de", "pageContentId": "760147", "translated":"true", "title": "Thüringen", "childNodes": []},{"_id": "content_page_21_de", "pageContentId": "756664", "translated":"true", "title": "Berlin", "childNodes": []},{"_id": "content_page_17_de", "pageContentId": "757227", "translated":"true", "title": "Hamburg", "childNodes": []},{"_id": "content_page_26_de", "pageContentId": "757775", "translated":"true", "title": "Köln", "childNodes": []},{"_id": "content_page_25_de", "pageContentId": "754370", "translated":"true", "title": "Alle Regionen", "childNodes": []}]},{"_id": "service_1_de", "pageContentId": "754473", "translated":"true", "title": "Service", "childNodes": [{"_id": "garantie_und_service_de", "pageContentId": "756527", "translated":"true", "title": "Garantie und Service", "childNodes": []},{"_id": "alles_aus_einer_hand_de", "pageContentId": "754455", "translated":"true", "title": "Alles aus einer Hand", "childNodes": []},{"_id": "content_page_279_de", "pageContentId": "780792", "translated":"true", "title": "15 gute Gründe", "childNodes": []},{"_id": "familie_3_de", "pageContentId": "782388", "translated":"true", "title": "Familie", "childNodes": []}]},{"_id": "preistabellen_de", "pageContentId": "754575", "translated":"true", "title": "Preise & Angebote", "childNodes": [{"_id": "content_page_10_de", "pageContentId": "754576", "translated":"true", "title": "Treppenlift Zuschüsse", "childNodes": []},{"_id": "content_page_11_de", "pageContentId": "754582", "translated":"true", "title": "Treppenlift mieten", "childNodes": []},{"_id": "content_page_421_de", "pageContentId": "787100", "translated":"true", "title": "125 Euro sichern", "childNodes": []}]},{"_id": "kontakt_1_de", "pageContentId": "755206", "translated":"true", "title": "Tel.: 0800 40 50 60 8", "childNodes": []},{"_id": "content_page_7_de", "pageContentId": "754489", "translated":"true", "title": "Über uns", "childNodes": [{"_id": "content_page_9_de", "pageContentId": "754511", "translated":"true", "title": "Karriere", "childNodes": []}]}] }}';
}
