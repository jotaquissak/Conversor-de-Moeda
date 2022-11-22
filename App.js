import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
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
    if(valorParaCalcular != undefined && valorDaAPI != undefined && valorParaCalcular > 0){
      let valorDaConversao = valorParaCalcular * valorDaAPI
      valorDaConversao = valorDaConversao.toFixed(2)
      setValorConvertido(valorDaConversao)
    } else{
      setValorConvertido("Valor convertido")
    }
    
  }, [valorParaCalcular, valorDaAPI])

  const pegaValorDe = (e) => {
    setValorDe(e)
  }

  const pegaValorPara = (e) => {
    setValorPara(e)
  }

const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${valorDe}.json`

const funcaoChamaAPI = useEffect(() => {
  if(valorDe != undefined && valorPara != undefined){
    fetch(url)
  .then(res => {
    return res.json()
  })
  .then(res2 => {
    setValorDaAPI(res2[valorDe][valorPara])
    console.log(res2[valorDe])
  })
  }
}, [valorDe, valorPara])

  const moedas = [
    {key: 'bob', value: 'Boliviano da Bolívia'},
    {key: 'btc', value: 'Bitcoin', },
    {key: 'sek', value: 'Coroa Sueca'},
    {key: 'usd', value: 'Dólar Americano'},
    {key: 'aud', value: 'Dólar Australiano'},
    {key: 'cad', value: 'Dólar Canadense'},
    {key: 'eur', value: 'Euro'},
    {key: 'jpy', value: 'Iene Japonês'},
    {key: 'gbp', value: 'Libra Esterlina'},
    {key: 'ars', value: 'Peso Argentino'},
    {key: 'brl', value: 'Real Brasileiro'},
    {key: 'qar', value: 'Rial Catariano'},
    {key: 'rub', value: 'Rublo Russo'},
    {key: 'cny', value: 'Yuan Chinês'},
  ]

  /*
  A - B - C - D - E - F - G - H - I - J - K - L - M - N - O - P - Q - R - S - T - U - V - W - X - Y - Z
  */

  return (
    <View style={styles.container}>
       <StatusBar hidden={false} backgroundColor="rgba(0, 0, 0, 0.5)" translucent={false}/>
       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.containerBox}>

          <View style={styles.textDePara_container}>
          <Text style={styles.textoDePara}>De:</Text>
          </View>

          <View style={styles.selectListCurrency_container}>
            <SelectList  data={moedas} setSelected={setSelect} inputStyles={styles.selectListCurrency} placeholder="Escolha a moeda" boxStyles={styles.boxSelectListCurrency} dropdownStyles={styles.dropdownStyles} onSelect={() => pegaValorDe(select)} search={false} maxHeight={80} arrowicon={<Icon name="caret-down" size={20} color="#013CBE"/>} dropdownTextStyles={styles.dropdownTextStyles}/>
          </View>

          <View style={styles.valorRecebido_container}>
            <TextInput keyboardType="number-pad" style={styles.valorRecebido} maxLength={10} multiline={false} editable={true} value={valorParaCalcular} onChangeText={(e) => {
              setValorParaCalcular(e);
            }} placeholder="Digite o valor" placeholderTextColor="#FFF"
            />
          </View>

           <View style={styles.textDePara_container}>
            <Text style={styles.textoDePara}>Para:</Text>
          </View>

          <View style={styles.selectListCurrency_container}>
            <SelectList  data={moedas} setSelected={setSelect} inputStyles={styles.selectListCurrency} placeholder="Escolha a moeda" boxStyles={styles.boxSelectListCurrency} dropdownStyles={styles.dropdownStyles} onSelect={() => pegaValorPara(select)} search={false} maxHeight={80} arrowicon={<Icon name="caret-down" size={20} color="#013CBE"/>} dropdownTextStyles={styles.dropdownTextStyles}/>
          </View>
          
          <View style={styles.valorConvertido_container}>
            <Text style={styles.valorConvertido} maxLength={10} multiline={false} editable={false} accessibilityLabel="teste">{valorConvertido}</Text>
          </View> 
          
        </View>  
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013CBE',
    alignItems: 'center',
  },
  containerBox: {
    backgroundColor: "#fefefe",
    padding: 35,
    borderRadius: 25,
    marginVertical: 50
  },
  textoDePara: {
    fontSize: 24,
    textAlign: "left",
    marginBottom: 30,
    color: "#013CBE",
  },
  selectListCurrency: {
    textAlign: "center",
    width: "100%",
    color: "#013CBE",
    fontSize: 16
  },
  selectListCurrency_container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 50
  },
  
  boxSelectListCurrency: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#013CBE",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  textDePara_container: {
    paddingHorizontal: "10%",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  dropdownStyles: {
    marginTop: 0,
    backgroundColor: "#013CBE",
    borderRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#013CBE",
    color: "#FFF"
  },
  dropdownTextStyles: {
    color: "#FFF"
  },
  valorRecebido: {
    backgroundColor: "#013CBE",
    width: "82%",
    height: 45,
    textAlign: "left",
    borderRadius: 5,
    borderWidth: 0.5,
    fontSize: 16,
    paddingLeft: 5,
    textAlign: "center",
    marginBottom: 50,
    textAlignVertical: "center",
    color: "#FFF"
  },
  valorRecebido_container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  valorConvertido: {
    marginTop: 20,
    backgroundColor: "#013CBE",
    width: "82%",
    height: 45,
    textAlign: "left",
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: "flex-start",
    fontSize: 16,
    paddingLeft: 5,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFF"
  },
  valorConvertido_container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },
  scrollView: {
  }
});
