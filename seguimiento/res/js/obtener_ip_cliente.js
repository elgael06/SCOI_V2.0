var IP_CLIENTE = null;
function obtener_ip_cliente() {
    var ip_cliente = '';
    var findIP = new Promise(r=> {
        var w = window,
            a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }),
            b = () => { };
        a.createDataChannel("");
        a.createOffer(c=>a.setLocalDescription(c, b, b), b);
        a.onicecandidate = c=> {
            try {
                c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)
            } catch (e) { }
        }
    });

    /*obtiene la IP*/
    findIP.then((ip) => { IP_CLIENTE = ip; console.log('Tu IP: ', ip) }).catch(e => console.error(e));
}