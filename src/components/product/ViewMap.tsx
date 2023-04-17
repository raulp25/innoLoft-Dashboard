import { useEffect, useState, useRef } from "react";
import { useSelector } from "@/redux/store";
import { mapPR } from "@/providers/mapProvider";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css';  


const ViewMap = () => {
    const { company } = useSelector(state => state.company);
    const [center, setCenter] = useState<{lat: number, lng: number}>({ lat: 0, lng: 0 });
    const ZOOM_LEVEL = 7;
    const mapRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if(company === null)
    return;

    setCenter({
      ['lat']: Number(company.company!.address.latitude),
      ['lng']: Number(company.company!.address.longitude),
    })
  }, []);
  
    return (
        <div className="mt-2">
          <div className="row">
            <div className="col text-center">
              <div className="col">
                {isMounted && (
                <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={true} className="w-11/12 h-48" ref={mapRef}>
                  <TileLayer
                    attribution={mapPR.maptiler.attribution}
                    url={mapPR.maptiler.url}
                  />
                  <CircleMarker center={center} fill fillColor="#ca2e2e" color="#f07f7f">
                    <Popup>
                      {company?.name} <br /> 
                    </Popup>
                  </CircleMarker>
              </MapContainer>
                )}
              </div>
            </div>
          </div>
        </div>
    );
};

export default ViewMap;