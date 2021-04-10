import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import {
  Container,
  Form,
  FieldGroup,
  Field,
  ItemsGrid,
  ItemsGridItem,
} from './styles';

import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';
import Success from '../../components/Success';

interface Items {
  id: number;
  image_url: string;
  title: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState<Items[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  useEffect(() => {
    api.get('items').then(response => setItems(response.data));

    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => setUfs(response.data.map(uf => uf.sigla)));

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => setCities(response.data.map(city => city.nome)));
  }, [selectedUf]);

  function handleMapClick(e: LeafletMouseEvent) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e?.target;

    setFormData({ ...formData, [id]: value });
  }

  function handleSelecteItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, email, whatsapp } = formData;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', selectedUf);
    data.append('city', selectedCity);
    data.append('latitude', String(selectedPosition[0]));
    data.append('longitude', String(selectedPosition[1]));
    data.append('items', selectedItems.join(','));

    if (selectedFile) data.append('image', selectedFile);

    await api.post('points', data);

    setSuccess(true);

    setTimeout(() => {
      history.push('/');
    }, 2000);
  }

  return (
    <>
      {success ? (
        <Success />
      ) : (
        <Container>
          <header>
            <img src={logo} alt="Ecoleta" />

            <Link to="/">
              <FiArrowLeft />
              Voltar para Home
            </Link>
          </header>

          <Form onSubmit={handleSubmit}>
            <h1>
              Cadastro do <br /> ponto de coleta
            </h1>

            <Dropzone onFileUploaded={setSelectedFile} />

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>

              <Field>
                <label htmlFor="name">Nome da entidade</label>
                <input
                  autoComplete="none"
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                />
              </Field>

              <FieldGroup>
                <Field>
                  <label htmlFor="email">E-mail</label>
                  <input
                    autoComplete="none"
                    type="email"
                    id="email"
                    onChange={handleInputChange}
                  />
                </Field>

                <Field>
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input
                    autoComplete="none"
                    type="text"
                    id="whatsapp"
                    onChange={handleInputChange}
                  />
                </Field>
              </FieldGroup>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
              </legend>

              <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={selectedPosition} />
              </Map>

              <FieldGroup>
                <Field>
                  <label htmlFor="uf">Estado</label>
                  <select
                    id="uf"
                    value={selectedUf}
                    onChange={e => setSelectedUf(e.target.value)}
                  >
                    <option value="0">Selecione uma UF</option>
                    {ufs.map(uf => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field>
                  <label htmlFor="city">Cidade</label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                  >
                    <option value="0">Selecione uma cidade</option>
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </Field>
              </FieldGroup>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Ítens de coleta</h2>
                <span>Selecione um ou mais itens</span>
              </legend>

              <ItemsGrid>
                {items.map(item => (
                  <ItemsGridItem
                    key={item.id}
                    onClick={() => handleSelecteItem(item.id)}
                    selected={selectedItems.includes(item.id)}
                  >
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </ItemsGridItem>
                ))}
              </ItemsGrid>
            </fieldset>

            <button type="submit">Cadastrar ponto de coleta</button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default CreatePoint;
