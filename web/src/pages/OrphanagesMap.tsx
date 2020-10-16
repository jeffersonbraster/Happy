import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import mapMarker from '../img/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import mapIcon from '../util/MapIcon';
import api from '../services/api';

interface OrphanageProps {
  id: number
  latitude: number
  longitude: number
  name: string
}

export default function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="happy"/>

          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianlas estão esperando a sua visita.</p>
        </header>

        <footer>
          <strong>Fortaleza</strong>
          <span>Ceará</span>
        </footer>
      </aside>
      <Map center={[-3.7863919,-38.4987143]} zoom={15} style={{width: '100%', height: '100%'}}>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => (
          <Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}