import React from 'react';
import {Alert, View} from 'react-native';
import {List, ListItem, Button, InputGroup, Input, Icon, Text, Header, Item} from 'native-base';
import Datastore from 'react-native-local-mongodb';
import SearchBar from 'react-native-search-bar';

export default class AddStation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'searchValue': '',
		}

	}
	onSubmit(station){
		var that = this;
		that.setState({'bgColor': '#ccc'});
		var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
		db.insert({'name': station}, function(err, newDoc){
			that.props.updateParentState();
			setTimeout(() => {that.props.goBack()}, 1000)
			
		});
	}
	render(){
		var that = this;
		var filteredList = stations.filter(function(station){return station.toLowerCase().indexOf(that.state.searchValue.toLowerCase()) !== -1});
		var stationsList = filteredList.map(station => (
				<ListItem 
					button
					key={station}
					onPress={()=>{that.onSubmit(station)}}
					>
					<Text>{station}</Text>
				</ListItem>
			)).slice(0,50);
		if(stationsList.length == 50){
			var ausgeblendetText = <Text style={{'margin': 10, 'color': '#ccc'}}>Einige Element sind ausgeblendet</Text>
		}
		return (
			<View>
				<Header searchBar rounded >
					<InputGroup>
						<Icon name="ios-search" />
						<Input autoFocus
							placeholder="Station suchen" 
	                    	value={this.state.searchValue} 
	                    	onChangeText={(text) => this.setState({'searchValue': text})} 
							/>
					</InputGroup>
					<Button transparent>.
					</Button>
		        </Header>
	            <List onEndReached={() => {alert('watup')}}>
	                {stationsList}
	                {ausgeblendetText}
	            </List>
            </View>
		);
	}
}

var stations = ["Zürich Flughafen, REGA","Zürich Flughafen, Werkhof","Zürich, Aargauerstrasse","Zürich, Albisgütli","Zürich, Albisrank","Zürich, Albisrieden","Zürich, Albisriederdörfli","Zürich, Albisriederplatz","Zürich, Alte Trotte","Zürich, Altenhofstrasse","Zürich, Althoos","Zürich, Am Börtli","Zürich, Am Suteracher","Zürich, Appenzellerstrasse","Zürich, Aspholz","Zürich, Aubrücke","Zürich, Ausserdorfstrasse","Zürich, Auzelg","Zürich, Auzelg Ost","Zürich, Bachmattstrasse","Zürich, Bäckeranlage","Zürich, Bad Allenmoos","Zürich Affoltern, Bahnhof","Zürich Affoltern, Bahnhof Süd","Zürich Altstetten, Bahnhof","Zürich Altstetten, Bahnhof N","Zürich Enge, Bahnhof","Zürich Enge, Bahnhof/Bederstr.","Zürich Hardbrücke, Bahnhof","Zürich Leimbach, Bahnhof","Zürich Oerlikon, Bahnhof Nord","Zürich Oerlikon, Bahnhof Ost","Zürich Selnau, Bahnhof","Stettbach, Bahnhof","Zürich Wipkingen, Bahnhof","Zürich, Bahnhofstrasse/HB","Zürich, Bändliweg","Zürich, Baslerstrasse","Zürich, Beckenhof","Zürich, Berghaldenstrasse","Zürich, Berninaplatz","Zürich, Bernoulli-Häuser","Zürich, Bertastrasse","Zürich, Berufswahlschule","Zürich, Besenrainstrasse","Zürich, Bethanien","Zürich, Bezirksgebäude","Zürich Wollishofen, Bhf (Bus)Zürich Wollishofen, Bahnhof (Bus)","Zürich Wollishofen, Bhf (Tram)Zürich Wollishofen, Bahnhof (Tram)","Zürich, Billoweg","Zürich, Grubenstrasse","Zürich, Binz Center","Zürich, Birch-/Glatttalstrasse","Zürich, Birchdörfli","Zürich, Bircher-Benner","Zürich, Birchstrasse","Zürich, Bleulerstrasse","Zürich, Blumenfeldstrasse","Zürich, Bocklerstrasse","Zürich, Bollingerweg","Zürich, Börsenstrasse","Zürich, Botanischer Garten","Zürich, Brandschenkestrasse","Zürich, Bristenstrasse","Zürich, Brunau/Mutschellenstr.","Zürich, Brunaustrasse","Zürich, Bucheggplatz","Zürich, Buchholz","Zürich, Buhnstrasse","Zürich, Burgwies","Zürich, Bürkliplatz","Zürich, Butzenstrasse","Zürich, Carl-Spitteler-Strasse","Zürich, Chaletweg","Zürich, Chinagarten","Zürich, Dammweg","Zürich, Dangelstrasse","Zürich, Dorflinde","Zürich, Dreispitz","Zürich, Dreiwiesen","Zürich, Drusbergstrasse","Zürich, Dunkelhölzli","Zürich, Einfangstrasse","Zürich, Englischviertelstrasse","Zürich, EPI-Klinik","Zürich, Eschergutweg","Zürich, ETH Hönggerberg","Zürich, ETH/Universitätsspital","Zürich, Ettenfeld","Zürich, Fellenbergstrasse","Zürich, Felsenrainstrasse","Zürich, Fernsehstudio","Zürich, Feusisbergli","Zürich, Fischerweg","Zürich, Flobotstrasse","Zürich, Flühgasse","Zürich, Flurstrasse","Zürich, Förrlibuckstrasse","Zürich, Frankental","Zürich, Freiestrasse","Zürich, Freihofstrasse","Zürich, Friedackerstrasse","Zürich, Friedhof Eichbühl","Zürich, Friedhof Enzenbühl","Zürich, Friedhof Hönggerberg","Zürich, Friedhof Schwandenholz","Zürich, Friedhof Sihlfeld","Zürich, Friedhof Uetliberg","Zürich, Friedhof Witikon","Zürich, Friedrichstrasse","Zürich, Friesenberg","Zürich, Friesenberghalde","Zürich, Friesenbergstrasse","Zürich, Frohburg","Zürich, Fronwald","Zürich, Frymannstrasse","Zürich, Geeringstrasse","Zürich, Germaniastrasse","Zürich, Giblenstrasse","Zürich, Glattwiesen","Zürich, Glaubtenstrasse","Zürich, Glaubtenstrasse Süd","Zürich, Glockenacker","Zürich, Goldackerweg","Zürich, Goldauerstrasse","Zürich, Grimselstrasse","Zürich, Grünaustrasse","Zürich, Guggachstrasse","Zürich, Güterbahnhof","Zürich, Gutstrasse","Zürich, Hadlaubstrasse","Zürich, Hagenholz","Zürich, Haldenbach","Zürich, Haldenegg","Zürich, Hallenbad Oerlikon","Zürich, Hardhof","Zürich, Hardplatz","Zürich, Hardturm","Zürich, Hedwigsteig","Zürich, Heerenwiesen","Zürich, Hegianwandweg","Zürich, Helmhaus","Zürich, Helvetiaplatz","Zürich, Herbstweg","Zürich, Herdernstrasse","Zürich, Hertensteinstrasse","Zürich, Herzogenmühlestrasse","Zürich, Heubeeriweg","Zürich, Heuried","Zürich, Himmeri","Zürich, Hinterbergstrasse","Zürich, Hirschwiesenstrasse","Zürich, Hirzenbach","Zürich, Höfliweg","Zürich, Hofstrasse","Zürich, Hohenklingensteig","Zürich, Hölderlinsteig","Zürich, Hölderlinstrasse","Zürich, Holzerhurd","Zürich, Hönggerberg","Zürich, Hottingerplatz","Zürich, Hubertus","Zürich, Hügelstrasse","Zürich, Hürlimannplatz","Zürich, Hürstholz","Zürich, Im Ebnet","Zürich, Im Gut","Zürich, Im Hagacker","Zürich, Im Hüsli","Zürich, Im Klösterli","Zürich, Im Walder","Zürich, Im Wingert","Zürich, In der Ey","Zürich, Juchhof","Zürich, Jugendherberge","Zürich, Kalchbühlweg","Zürich,Kalkbreite/Bhf.Wiedikon","Zürich, Kanonengasse","Zürich, Kantonsschule","Zürich, Kapfstrasse","Zürich, Kappeli","Zürich, Kappenbühlweg","Zürich, Käshaldenstrasse","Zürich, Genossenschaftsstrasse","Zürich, Kempfhofsteig","Zürich, Kernstrasse","Zürich, Kienastenwies","Zürich, Kinkelstrasse","Zürich, Kirche Fluntern","Zürich, Klosbach","Zürich, Klusplatz","Zürich, Köschenrüti","Zürich, Krematorium Nordheim","Zürich, Krematorium Sihlfeld","Zürich, Kronenstrasse","Zürich, Krönleinstrasse","Zürich, Kunsthaus","Zürich, Lägernstrasse","Zürich, Landiwiese","Zürich, Langensteinenstrasse","Zürich, Langgrütstrasse","Zürich, Langmauerstrasse","Zürich, Laubegg","Zürich, Laubiweg","Zürich, Lehenstrasse","Zürich, Leimgrübelstrasse","Zürich, Lerchenhalde","Zürich, Lerchenrain","Zürich, Lettenstrasse","Zürich, Letzigrund","Zürich, Letzipark","Zürich, Letzipark West","Zürich, Letzistrasse","Zürich, Leutschenbach","Zürich, Limmatplatz","Zürich, Lindenplatz","Zürich, Lochergut","Zürich, Loogarten","Zürich, Loorenstrasse","Zürich, Löwenplatz","Zürich, Luchswiesen","Zürich, Luegisland","Zürich, Luggwegstrasse","Zürich, Maienweg","Zürich, Maillartstrasse","Zürich, Manegg","Zürich, Manesseplatz","Zürich, Marbachweg","Zürich, Mattenhof","Zürich, Max-Bill-Platz","Zürich, Messe/Hallenstadion","Zürich, Micafil","Zürich, Michelstrasse","Zürich, Milchbuck","Zürich, Militär-/Langstrasse","Zürich, Mittelleimbach","Zürich, Morgental","Zürich, Mötteliweg","Zürich, Mühlacker","Zürich, Museum für Gestaltung","Zürich, Museum Rietberg","Zürich, Neeserweg","Zürich, Neuaffoltern","Zürich, Neubühl","Zürich, Neumarkt","Zürich, Neumühlequai/HB","Zürich, Neunbrunnen","Zürich, Nordheimstrasse","Zürich, Nordstrasse","Zürich, Nürenbergstrasse","Zürich, Oberwiesenstrasse","Zürich, Oerlikerhus","Zürich, Okenstrasse","Zürich, Orionstrasse","Zürich, Ottikerstrasse","Zürich, Paradeplatz","Zürich, Paulus-Akademie","Zürich, Pflegezentr. Käferberg","Zürich, Platte","Zürich, Post Wollishofen","Zürich, Probstei","Zürich, Quellenstrasse","Zürich, Radiostudio","Zürich, Räffelstrasse","Zürich, Rathaus","Zürich, Rautihalde","Zürich, Rautistrasse","Zürich, Rebbergsteig","Zürich, Regensbergbrücke","Zürich, Rehalp","Zürich, Rennweg","Zürich, Rentenanstalt","Zürich, Riedbach","Zürich, Riedgraben","Zürich, Riedhofstrasse","Zürich, Röntgenstrasse","Zürich, Rosengartenstrasse","Zürich, Röslistrasse","Zürich, Roswiesen","Zürich, Rotbuchstrasse","Zürich, Rudolf-Brun-Brücke","Zürich, Rütihof","Zürich, Saalsporthalle","Zürich, Saatlenstrasse","Zürich, Sackzelg","Zürich, Salersteig","Zürich, Salzweg","Zürich, SBB-Werkstätte","Zürich, Schaffhauserplatz","Zürich, Schäppiweg","Zürich, Schauenberg","Zürich, Scheuchzerstrasse","Zürich, Schlyfi","Zürich, Schmiede Wiedikon","Zürich, Schönauring","Zürich, Schörlistrasse","Zürich, Schulhaus Altweg","Zürich, Schulhaus Buchlern","Zürich, Schumacherweg","Zürich, Schürgistrasse","Zürich, Schützenhaus Höngg","Zürich, Schwamendingerplatz","Zürich, Schwandenholz","Zürich, Schweighof","Zürich, Schweizer Rück","Zürich, Schwert","Zürich, Seebach","Zürich, Seebacherplatz","Zürich, Seerose","Zürich, Segantinistrasse","Zürich, Segeten","Zürich, Seidelhof","Zürich, Seilbahn Rigiblick","Zürich, Siemens","Zürich, Signaustrasse","Zürich, Sihlcity","Zürich, Sihlcity Nord","Zürich, Sihlpost/HB","Zürich, Sihlquai/HBZHSI<3>","Zürich, Sihlstrasse","Zürich, Sihlweidstrasse","Zürich, Singlistrasse","Zürich, Solidapark","Zürich, Sonneggstrasse","Zürich, Sportweg","Zürich, Sprecherstrasse","Zürich, Spyriplatz","Zürich, Spyristeig","Zürich, Stadtgrenze","Zürich, Stampfenbachplatz","Zürich, Staudenbühl","Zürich, Stauffacher","Zürich, Sternen Oerlikon","Zürich, Stierenried","Zürich, Stockerstrasse","Zürich, Strassenverkehrsamt","Zürich, Strickhof","Zürich, Sukkulentensammlung","Zürich, Sunnau","Zürich, Susenbergstrasse","Zürich, Talwiesenstrasse","Zürich, Technopark","Zürich, Thujastrasse","Zürich, Tierspital","Zürich, Titlisstrasse","Zürich, Tobelhof","Zürich, Toblerplatz","Zürich, Toni-Areal","Zürich, Trichtenhausenfussweg","Zürich, Trichtisal","Zürich, Triemlispital","Zürich, Tüffenwies","Zürich, Tulpenstrasse","Zürich, Tunnelstrasse","Zürich, Uetlihof","Zürich, Universität Irchel","Zürich, Unteraffoltern","Zürich, Untermoosstrasse","Zürich, Verenastrasse","Zürich, Vogelsangstrasse","Zürich, Voltastrasse","Zürich, Vulkanstrasse","Zürich, Waffenplatz-/Bederstr.","Zürich, Waffenplatzstrasse","Zürich, Waidbadstrasse","Zürich, Waidfussweg","Zürich, Waidhof","Zürich, Waidspital","Zürich, Waldgarten","Zürich, Waldhaus Dolder","Zürich, Wartau","Zürich, Waserstrasse","Zürich, Weihersteig","Zürich, Werd","Zürich, Werdhölzli","Zürich, Wetlistrasse","Zürich, Widmerstrasse","Zürich, Wieslergasse","Zürich, Wiesliacher","Zürich, Winkelriedstrasse","Zürich, Winzerhalde","Zürich, Winzerstrasse","Zürich, Winzerstrasse Süd","Zürich, Wipkingerplatz","Zürich, Witikon Zentrum","Zürich, Wollishofen","Zürich, Wonnebergstrasse","Zürich, Zielweg","Zürich, Zoo","Zürich, Zoo/Forrenweid","Zürich, Zürichbergstrasse","Zürich, Zweiackerstrasse","Zürich, Zwielplatz","Zürich, Zwinglihaus","Zürich, Zypressenstrasse"];



