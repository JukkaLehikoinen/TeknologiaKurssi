import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import ilmoitusFunktio from './Ilmoitus'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));

function App() {

  const [haettu, setHaettu] = useState(false)
  const [lomakeTiedot, setLomakeTiedot] = useState({
    tunnus: '', etunimi: '', sukunimi: '',
    katuosoite: '', postinumero: '', postitoimipaikka: '', 
    puhelin: '', sahkoposti: '', syntymavuosi: ''
  })

  const classes = useStyles();

  let tahanTulee = "Tähän tulee käyttäjätiedot";

  const tallennaTieto = () => {
    fetch('http://localhost:3001/kayttaja', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(lomakeTiedot),
    })
      .then(function () { ilmoitusFunktio('Tiedot tallenettu onnistuneesti', 'green'); })
      .catch(function () { ilmoitusFunktio('Tietoja ei saatu tallennettua tietokantaan', 'red') });
  }



  const haeTiedot = async () => {
    try {
      let url = 'http://localhost:3001/kayttaja';
      let response = await fetch(url);
      let tiedot = await response.json();
      setHaettu(true)
      paivitetaanTieto(tiedot)
      ilmoitusFunktio('Tiedot ladattu tietokannasta onnistuneesti','green')
    } catch {
      setHaettu(false)
      ilmoitusFunktio('Tietokannasta ei saatu ladattu mitään :(', 'red')
    }
  }

  const paivitetaanTieto = async (tiedot) => {

    setLomakeTiedot({
        tunnus: tiedot.tunnus, etunimi: tiedot.etunimi, sukunimi: tiedot.sukunimi,
        katuosoite: tiedot.katuosoite, postinumero: tiedot.postinumero, postitoimipaikka: tiedot.postitoimipaikka,
        puhelin: tiedot.puhelin, sahkoposti: tiedot.sahkoposti, syntymavuosi: tiedot.syntymavuosi
      })
  }

  const tietoMuuttuu = (event) => {
    setLomakeTiedot({ ...lomakeTiedot, [event.target.id]: event.target.value });
  }

  return (
    <div className="App">
      <div className="ilmoitus"></div>
      <header className="App-header">
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={() => haeTiedot()}>Hae tiedot</Button>
          <Button variant="contained" color="primary" onClick={() => window.open('http://localhost:3001/kayttaja')}>Näytä localhost 3001/kayttaja</Button>
        </div>
      </header>
      {!haettu && <h3>{tahanTulee}</h3>}
      {haettu && <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField
            id="tunnus"
            label="Käyttäjätunnus"
            type="Text"
            value={lomakeTiedot.tunnus}
            InputProps={{
              readOnly: true,
            }} />

          <TextField
            id="etunimi"
            label="Etunimi"
            type="Text"
            value={lomakeTiedot.etunimi}
            onChange={tietoMuuttuu}
            autoFocus />

          <TextField
            id="sukunimi"
            label="Sukunimi"
            type="Text"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.sukunimi} />

          <TextField id="katuosoite"
            label="Katuosoite"
            type="Text"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.katuosoite} />

          <TextField id="postinumero"
            label="Postinumero"
            type="Number"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.postinumero} />

          <TextField id="postitoimipaikka"
            label="Postitoimipaikka"
            type="Text"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.postitoimipaikka} />

          <TextField id="syntymavuosi"
            label="Syntymävuosi"
            type="number"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.syntymavuosi} />

          <TextField id="puhelin"
            label="Puhelin"
            type="number"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.puhelin} />

          <TextField id="sahkoposti"
            label="Sähköposti"
            type="Text"
            onChange={tietoMuuttuu}
            value={lomakeTiedot.sahkoposti} />
        </div>
        <br></br>
        <Button variant="contained" color="primary" onClick={() => tallennaTieto()}>Tallenna</Button>
      </form>}
    </div>
  );
}

export default App;
