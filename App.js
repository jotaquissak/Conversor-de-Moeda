import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import SelectList from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {

  const [date, setDate] = useState("");
  const [select, setSelect]= useState("");
  const [valorParaCalcular, setValorParaCalcular] = useState();
  const [valorConvertido, setValorConvertido] = useState();
  const [valorDe, setValorDe] = useState();
  const [valorPara, setValorPara] = useState();
  const [valorDaAPI, setValorDaAPI] = useState();

  const dataDoDispositivo = useEffect(() => {
    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let ano = new Date().getFullYear();

    let dataFormatada = `${ano}-${mes}-${dia}`

    setDate(dataFormatada);
  })
  
  const mudaValorDeCalculo = useEffect(() => {
    if(valorParaCalcular != undefined && valorDaAPI != undefined){
      let valorDaConversao = valorParaCalcular * valorDaAPI
      valorDaConversao = valorDaConversao.toFixed(2)
      setValorConvertido(valorDaConversao)
    } else{
      setValorConvertido("")
    }
    
  }, [valorParaCalcular, valorDaAPI])

  const pegaValorDe = (e) => {
    setValorDe(e)
  }

  const pegaValorPara = (e) => {
    setValorPara(e)
  }

const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${valorDe}/${valorPara}.json`

const funcaoChamaAPI = useEffect(() => {
  if(valorDe != undefined && valorPara != undefined){
    fetch(url)
  .then(res => {
    return res.json()
  })
  .then(res2 => {
    switch (valorPara){
      case "brl":
        setValorDaAPI(res2.brl)
        break
      case "usd":
        setValorDaAPI(res2.usd)
        break
      case "eur":
        setValorDaAPI(res2.eur)
        break
      case "ars":
        setValorDaAPI(res2.ars)
        break
      case "aud":
        setValorDaAPI(res2.aud)
        break
      case "bob":
        setValorDaAPI(res2.bob)
        break
      case "cad":
        setValorDaAPI(res2.cad)
        break
      default:
        break
    }
  })
  }
}, [valorDe, valorPara])

  const moedas = [
    {key: 'eur', value: 'Euro'},
    {key: 'usd', value: 'Dolar Americano'},
    {key: 'brl', value: 'Real Brasileiro'},
    {key: 'ars', value: 'Peso Argentino'},
    {key: 'aud', value: 'Dolar Australiano'},
    {key: 'bob', value: 'Boliviano da Bolívia'},
    {key: 'cad', value: 'Dolar Canadense'},
  ]

  return (
    <View style={styles.container}>
       <StatusBar hidden={false} backgroundColor="rgba(255, 255, 255, 0)" translucent={false}/>

      <View style={styles.textDePara_container}>
        <Text style={styles.textoDePara}>De:</Text>
      </View>

      <View style={styles.selectListCurrency_container}>
        <SelectList  data={moedas} setSelected={setSelect} inputStyles={styles.selectListCurrency} placeholder="Escolha a moeda" searchPlaceholder="Ex: Dolar" boxStyles={styles.boxSelectListCurrency} dropdownStyles={styles.dropdownStyles}
        onSelect={(e) => pegaValorDe(select)} search={false} maxHeight={100} arrowicon={<Icon name="caret-down" size={20} color="#000"/>} />
      </View>

       <View style={styles.textDePara_container}>
        <Text style={styles.textoDePara}>Para:</Text>
      </View>

      <View style={styles.selectListCurrency_container}>
        <SelectList  data={moedas} setSelected={setSelect} inputStyles={styles.selectListCurrency} placeholder="Escolha a moeda" searchPlaceholder="Ex: Dolar" boxStyles={styles.boxSelectListCurrency} dropdownStyles={styles.dropdownStyles} onSelect={() => pegaValorPara(select)} search={false} maxHeight={100} arrowicon={<Icon name="caret-down" size={20} color="#000"/>}/>
      </View>
        
      <View style={styles.valorRecebido_container}>
        <TextInput keyboardType="number-pad" style={styles.valorRecebido} maxLength={10} multiline={false} editable={true} value={valorParaCalcular} onChangeText={(e) => {
          setValorParaCalcular(e);
        }}/>
      </View>
      
      <View style={styles.valorConvertido_container}>
        <Text style={styles.valorConvertido} maxLength={10} multiline={false} editable={false} >{valorConvertido}</Text>
      </View> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  textoDePara: {
    fontSize: 20,
    textAlign: "left",
  },
  selectListCurrency: {
    textAlign: "center",
    width: "100%",
  },
  selectListCurrency_container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  
  boxSelectListCurrency: {
    width: "80%",
    backgroundColor: "#FBF9F9",
    borderRadius: 2,
    borderWidth: 0,
  },
  textDePara_container: {
    paddingHorizontal: "10%",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  dropdownStyles: {
    backgroundColor: "#fefefe",
  },
  valorRecebido: {
    backgroundColor: "#c9c0c0",
    width: "82%",
    height: 35,
    textAlign: "left",
    borderRadius: 2,
    borderWidth: 0,
    fontSize: 25,
    paddingLeft: 5
  },
  valorRecebido_container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  valorConvertido: {
    backgroundColor: "#c9c0c0",
    width: "82%",
    height: 35,
    textAlign: "left",
    borderRadius: 2,
    borderWidth: 0,
    justifyContent: "flex-start",
    fontSize: 25,
    paddingLeft: 5
  },
  valorConvertido_container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  }
});
