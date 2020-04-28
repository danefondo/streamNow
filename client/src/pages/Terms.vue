<template>
  <div class="footer_page_container">
    <AboutNav />
    <div class="footer_page">
      <div class="textTitle">Eeter.tv kasutustingimused</div>
      <div class="textSection">
        <span class="textStyle">28.04.2020</span>
      </div>

      <div class="textTitle">Mõisted</div>
      <div class="textSection">
        <span class="textStyle">Eeter.tv - Meie, tere@eeter.tv
          <br />Kasutustingimused - käesolevad tingimused veebilehe kasutamiseks, sisu üleslaadimiseks, toetuste kogumiseks.
          <br />Kasutaja - Eeter.tv keskkonna kasutaja.
          <br />Looja - Kasutaja, kes lisab Eeter.tv keskkonda videosisu, ja/või kogub sellelt toetuseid.
          <br />Toetaja - Kasutaja, kes annetab Eeter.tv platvormi vahendusel Loojatele raha.
          <br />Pool - Eeter.tv või Kasutaja, koos nimetatud Pooled.
          <br />Sisu - Eeter.tv keskkonda saadetud video, pilt, või kirjutis.
          <br />Toetus - Kasutaja tehtud annetus.
        </span>
      </div>

      <div class="textTitle">Tere tulemast Eeter.tv veebilehele. Kasutustingimused kehtivad kõikidele Kasutajatele.</div>
      <div class="textSection">
        <span class="textStyle">Eeter.tv -l on õigus Üldtingimusi ühepoolselt muuta. Üldtingimuste muudatusest teavitab Eeter.tv Kasutajaid kodulehel ja e-posti teel.
          <br />
          <br />Eeter.tv ei oma juriidilist vastutust kasutajate poolt sisestatud Sisu eest.
          <br />
          <br />Sisu meile saatmisel ja avaldamisel palun arvesta, et me eeldame Looja autorsust või õiguste omamist, mis lubab seda teost üldsusele kättesaadavaks teha. Teose meie platvormi lisamisel annab Looja Eeter.tv platvormile tasuta õiguse teose vabaks kasutamiseks mistahes piiranguteta, sealhulgas, kuid mitte ainult, tähtaja, õiguste mahu, nende kasutamise vormi, viisi, tehnilise vahendi või territooriumi osas.
          <br />
          <br />Kuna Eeter.tv vaid koondab kolmandate platvormide Sisu, on Loojal täielik kontroll oma lisatud sisu üle just läbi nende kolmandate platvormide.
          <br />
          <br />Kolmandatele osapooltele on Eeter.tv keskkonnas leiduva Sisu avaldamine, dubleerimine või muul viisil kasutamine ilma ühe Sisu kasutusõigust omava Poole kirjaliku loata keelatud.
          <br />
          <br />Kui Sa oled Eeter.tv keskkonnas asuva Sisu autor või õiguste omaja ja Sa ise ei ole seda Sisu meile saatnud ning soovid, et see Sisu ei oleks üldsusele kättesaadav, siis saada palun meile e-mail aadressile:
          <a
            href="mailto:tere@eeter.tv"
          >tere@eeter.tv</a>.
          <br />
          <br />Eeter.tv on antud tehingute puhul vahendaja rollis ja tänase seisuga Eeter.tv tehtud Toetustelt teenustasu ei võta. Kõik saadud tulud kantakse üle Loojatele. Toetuse valuuta on Euro. Eeter.tv platvormil tehtud annetused (toetused) ei ole tagastatavad.
          <br />
          <br />Toetusega kaasneb siiski 3%-ne maksevahendajate tasu, mis ei sõltu paraku meist ja on otsene kulu igalt makselt. Minimaalne tasu ühe ostu kohta on 18 senti. Maksevahendajate tasule lisandub käibemaks.
          <br />
          <br />Kuna Sisu on kõikidele vaatajatele tasuta kättesaadav ning toetusi tehakse vaid oma vabal soovil ja valikul, siis ka eraisikust Loojatel ei teki maksukohustust, sest eraisikute vahelisi annetusi ei maksustata. Tulenevalt eeltoodust ei teki Eeter.tv maksukohustust saadud tulude edasikandmisel. Kui Toetajaks on ettevõte, langeb sellega seotud juriidiline vastutus Toetajale.
          <br />
          <br />Toetajal ei ole võimalik tehtud toetust oma maksustatavast tulust maha arvata. Sihtasutustele ja MTÜ-de toetamisel rakenduvad eritingimused.
          <br />
          <br />Loojatele laekunud raha maksame välja iga kuu alguses, eelmise kuu kogutud Toetuste eest. Minimaalne väljamakse summa on 20 (kakskümmend) Eurot. Töötame selle kallal, et protsessi kiiremaks ja mugavamaks muuta.
          <br />
          <br />Kõikide küsimuste ja pretensioonide korral palun kirjutada
          <a
            href="mailto:tere@eeter.tv"
          >tere@eeter.tv</a>.
          Palun tutvu meie andmete töötlemise põhimõtetega
          <a
            href="https://www.eeter.tv/privacy"
          >Privaatsuseeskirja</a>
          lehel.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AboutNav from "../components/AboutNav";

export default {
  name: "Terms",
  components: {
    AboutNav
  }
};
</script>


<style>
.textTitle {
  font-size: 11pt;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: transparent;
  font-weight: 700;
  font-style: normal;
  font-variant: normal;
  text-decoration: none;
  vertical-align: baseline;
  white-space: pre-wrap;
  margin-bottom: 6px;
}
.textStyle {
  font-size: 11pt;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: transparent;
  font-style: normal;
  font-variant: normal;
  text-decoration: none;
  vertical-align: baseline;
  white-space: pre-wrap;
  line-height: 1.38;
  margin-top: 0pt;
  margin-bottom: 0pt;
}

.textSection {
  margin-bottom: 30px;
}
.footer_page_container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  font-family: "Trebuchet MS", sans-serif;
}
.footer_page {
  padding: 30px 0px;
  padding-bottom: 40px;
  font-size: 18px !important;
  max-width: 600px;
  margin: 0 auto;
}

/*! CSS Used from: https://www.eeter.tv/css/navigation.css */
.topNavigationLink__topBar {
  border-radius: 4px;
  padding: 12px 16px;
  margin: 0px 6px;
  box-sizing: border-box;
  margin-bottom: 0px;
  border: 1px solid transparent;
}
.topNavigationLink__topBar {
  color: #120088;
  font-weight: bold;
  padding: 10px 16px;
  display: inline-block;
}
.topNavigationLink__topBar:hover {
  background-color: #f5f5f5;
}
.nav-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0px 15px;
  background-color: #b1f6ff00;
  height: 60px;
}
.nav-container a {
  text-decoration: none;
}
/*! CSS Used from: https://www.eeter.tv/css/responsive.css */
@media screen and (max-width: 480px) {
  .nav-container {
    padding: 10px 0px;
    flex-wrap: wrap;
  }
  .navlinks-container {
    margin-left: 10px;
  }
  .topNavigationLink__topBar {
    padding: 10px 6px;
    margin: 0px 4px;
  }
}
/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.nav-container {
  padding-top: 0px;
}
.auto-side-margins {
  margin-left: auto;
  margin-right: auto;
}
.active-about {
  background-color: #f7f7fb;
}
</style>
