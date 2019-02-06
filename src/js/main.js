const content = document.querySelector('.content');

window.TheMap = {
    gmaps_key: 'AIzaSyCLa9s7jeckW67uXnugOOhG7q57X8LtjHQ',
    markers: [],
    tm: [],
    positions: JSON.parse('[{"lat":33.0215277,"lng":-96.7306233},{"lat":33.021615408644465,"lng":-96.73046773187713},{"lat":33.02185379580133,"lng":-96.73028534166411},{"lat":33.02186728939471,"lng":-96.73082178346709},{"lat":33.0222001307108,"lng":-96.73062866441802},{"lat":33.02247000112559,"lng":-96.73058038465575},{"lat":33.022366550897566,"lng":-96.73012977354125},{"lat":33.02234855954117,"lng":-96.72965770475463},{"lat":33.021930259469805,"lng":-96.72963624708251},{"lat":33.021282565120664,"lng":-96.72966843359069},{"lat":33.02108915546873,"lng":-96.73024242631988},{"lat":33.02076530579912,"lng":-96.73008685819701},{"lat":33.020576392942466,"lng":-96.72952895872191},{"lat":33.020135594702616,"lng":-96.72957187406615},{"lat":33.0213320419402,"lng":-96.72902470342711},{"lat":33.02086425999105,"lng":-96.72882621996001},{"lat":33.02109365337242,"lng":-96.72892814390258},{"lat":33.02154344258365,"lng":-96.73114901296691},{"lat":33.02212816512732,"lng":-96.73174446336822},{"lat":33.02244301412131,"lng":-96.73185175172881},{"lat":33.02257345123222,"lng":-96.73132067434386},{"lat":33.022595940369754,"lng":-96.7310578178604},{"lat":33.022748190503684,"lng":-96.73216208190883},{"lat":33.023117010903846,"lng":-96.73205479354823},{"lat":33.023112513103385,"lng":-96.73180803031886},{"lat":33.0231080153027,"lng":-96.73166319103206},{"lat":33.023112513103385,"lng":-96.73150225849116},{"lat":33.02309002409763,"lng":-96.7313466903683},{"lat":33.023112513103385,"lng":-96.73116966457332},{"lat":33.02315299329931,"lng":-96.73101409645045},{"lat":33.02313500210343,"lng":-96.73086925716365},{"lat":33.02312150870408,"lng":-96.7306815025326},{"lat":33.02312150870408,"lng":-96.73050984115565},{"lat":33.023076530691434,"lng":-96.73037036628688},{"lat":33.02309002409763,"lng":-96.73018797607386},{"lat":33.02309452189926,"lng":-96.73005386562312},{"lat":33.02309452189926,"lng":-96.72986611099208},{"lat":33.02323395363535,"lng":-96.72965153427089},{"lat":33.023170984491514,"lng":-96.7291405935199},{"lat":33.02315749109772,"lng":-96.72888310145447},{"lat":33.02315749109772,"lng":-96.72866852473328},{"lat":33.023175482289,"lng":-96.72841103266785},{"lat":33.02315749109772,"lng":-96.72816731442651},{"lat":33.023161988895865,"lng":-96.72792055119714},{"lat":33.023179980086255,"lng":-96.7276791523858},{"lat":33.0231664866938,"lng":-96.7274431179925},{"lat":33.02362975865235,"lng":-96.72913290967188},{"lat":33.02361626532875,"lng":-96.72887541760645},{"lat":33.02401206862906,"lng":-96.72911145199976},{"lat":33.02342286079698,"lng":-96.72964355087618},{"lat":33.023562292013715,"lng":-96.72968110180238},{"lat":33.020665675630894,"lng":-96.72867259121278},{"lat":33.02050375016696,"lng":-96.72851165867189},{"lat":33.02033282852128,"lng":-96.72838291263918},{"lat":33.02051724396701,"lng":-96.72751924133638},{"lat":33.02067916940613,"lng":-96.72689696884493},{"lat":33.021056994274176,"lng":-96.72716518974642},{"lat":33.021218918721935,"lng":-96.7272349271808},{"lat":33.02145730695098,"lng":-96.72735830879549},{"lat":33.02111096912315,"lng":-96.7278464708362},{"lat":33.02096253820898,"lng":-96.72816297149996},{"lat":33.02110647122032,"lng":-96.728350726131},{"lat":33.02045877081866,"lng":-96.7266770277057},{"lat":33.02005845360764,"lng":-96.72822734451631},{"lat":33.01972560420543,"lng":-96.72908028698305},{"lat":33.0197660859566,"lng":-96.72872623539308},{"lat":33.020337326463576,"lng":-96.72953626251558}]'),
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
            center: new google.maps.LatLng(33.0215277, -96.7306233),
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
            // clear label
            content.innerHTML = 'Ok, you added a new neighbour on the map!';
        })

    },
    addMarker: function(lat, lng) {
        
        var self = this;

        this.tm.push({
            lat: lat,
            lng: lng
        });

        var len = this.markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: self.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                strokeColor: 'green'
            }
        }));

        this.markers[len-1].addListener('click', function() {
            self.geocoder.geocode({
                latLng: this.getPosition()
            }, (response) => {
                var msg = response[0] ? response[0].formatted_address : 'Sorry, we cound\'t find the address';
                content.innerHTML = msg;
                if (response[0]) {
                    // console.log(response[0]);
                    self.scanAddress(response[0].formatted_address);
                }
            });
        });
    },
    scanAddress: function(address) {
        // split address, extract first part
        var addr = address.split(',')[0];

        content.innerHTML = 'Loading, please wait ...';
        
        // init axios call
        axios.post('https://p5zpc40m34.execute-api.us-east-1.amazonaws.com/prod/scan', {
            address: addr
        }).then(res => {

            content.innerHTML = address;
            //
            if(res.data.items) {
                var ul = document.createElement('ul');
                var list = '';

                var heading = document.createElement('h4');
                heading.innerHTML = 'Sub addresses';
                // console.log(heading);

                content.append(heading);

                if(res.data.items.length) {
                    // loop items
                    res.data.items.forEach(item => {
                        list += '<li><strong>' + item.street + ', APT ' + item.suite + '</strong><br />' + item.state + ', ' + item.zip + '-' + item.zip_four + '</li>';
                    });

                    if (res.data.total > res.data.items.length) {
                        list += '<li><em>' + (res.data.total - res.data.items.length) + ' more ...</em></li>';
                    }
                } else {
                    list += '<li><em>No sub addresses available</em></li>';
                }

                ul.innerHTML = list;
                content.append(ul);
            } else {

            }

        });
        
        
    }
    
}

window.addEventListener('load', () => {
    TheMap.initMap();
});