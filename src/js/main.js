window.TheMap = {
    gmaps_key: 'AIzaSyD92C39_T4NEluUc3vO1YLgsj2EZIf7P9o',
    markers: [],
    positions: [{ "lat": 33.183739139073616, "lng": -96.76694377500763 }, { "lat": 33.183739139073616, "lng": -96.76677747804871 }, { "lat": 33.18372567031151, "lng": -96.76662727434388 }, { "lat": 33.18372118072367, "lng": -96.76645561296692 }, { "lat": 33.18372567031151, "lng": -96.766289316008 }, { "lat": 33.18371669113561, "lng": -96.76611229021302 }, { "lat": 33.18373464948647, "lng": -96.76593526441803 }, { "lat": 33.18372567031151, "lng": -96.76580115396729 }, { "lat": 33.183743628660544, "lng": -96.76561876375428 }, { "lat": 33.183743628660544, "lng": -96.7654792888855 }, { "lat": 33.1837481182472, "lng": -96.76530226309052 }, { "lat": 33.1837481182472, "lng": -96.7651198728775 }, { "lat": 33.183801993269455, "lng": -96.76496430475464 }, { "lat": 33.18377954534755, "lng": -96.76479264337769 }, { "lat": 33.18380648285314, "lng": -96.76464780409088 }, { "lat": 33.18378403493239, "lng": -96.76444932062378 }, { "lat": 33.1837930141014, "lng": -96.7643259390091 }, { "lat": 33.18380648285314, "lng": -96.764127455542 }, { "lat": 33.18337997137522, "lng": -96.76549538213959 }, { "lat": 33.18337997137522, "lng": -96.76526471216431 }, { "lat": 33.18340241939948, "lng": -96.7651198728775 }, { "lat": 33.18342037781477, "lng": -96.76496966917267 }, { "lat": 33.18340241939948, "lng": -96.76476582128754 }, { "lat": 33.18342935702105, "lng": -96.76465853292694 }, { "lat": 33.18342935702105, "lng": -96.7644707782959 }, { "lat": 33.18343384662382, "lng": -96.7642722948288 }, { "lat": 33.18344282582873, "lng": -96.764127455542 }, { "lat": 33.18343833622639, "lng": -96.7639665230011 }, { "lat": 33.18346078423572, "lng": -96.763768039534 }, { "lat": 33.18345629463432, "lng": -96.76362856466523 }],
    initMap: function() {
        var gmap = document.createElement('script');
        gmap.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + this.gmaps_key + '&callback=TheMap.createMap&libraries=places');
        gmap.setAttribute('type', 'text/javascript');
        gmap.setAttribute('async', true);
        gmap.setAttribute('defer', true);
        document.body.appendChild(gmap);
    },
    createMap: function() {

        var self = this;

        // init map
        this.map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 18,
            center: new google.maps.LatLng(33.1832812, -96.7659299),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            scrollwheel: false,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
        });

        this.geocoder = new google.maps.Geocoder();

        // loop positions
        if(this.positions.length) {
            for(var i = 0; i<this.positions.length; i++) {
                this.addMarker(this.positions[i].lat, this.positions[i].lng);
            }
        }

        this.map.addListener('click', function (e) {
            // add marker
            self.addMarker(e.latLng.lat(), e.latLng.lng());
        })

    },
    addMarker: function(lat, lng) {
        
        var self = this;

        var len = this.markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: self.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                strokeColor: 'green'
            }
        }));

        // clear label
        document.querySelector('.label').innerHTML = '';

        this.markers[len-1].addListener('click', function() {
            self.geocoder.geocode({
                latLng: this.getPosition()
            }, (response) => {
                    var msg = response[0] ? response[0].formatted_address : 'Sorry, we cound\'t find the address';
                    document.querySelector('.label').innerHTML = msg;
                });
        });
    }
}

window.addEventListener('load', () => {
    TheMap.initMap();
});