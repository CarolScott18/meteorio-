import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })


    }

    renderItem = ({ item }) => {
        let meteor = item
        let bg_img, speed, size;

        if (meteor.threat_score <= 30) {
            bg_img = require("../assets/meteor_bg1.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 100
        }
        else if (meteor.threat_score <= 75) {
            bg_img = require("../assets/meteor_bg2.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 150
        }
        else {
            bg_img = require("../assets/meteor_bg3.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 200
        }

    };

    keyExtractor = (item, index) => index.toString();

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Carregando</Text>
                </View>
            )
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
              let meteors = [].concat.apply([], meteor_arr);
              /* meteor_arr que contenha todo o array de objetos em um meteor_date 
               específico com a função map() iterando sobre todas as chaves do objeto 
              (que são as datas dos próximos 7 dias). Também concatenamos todos os arrays 
              dentro de nosso meteor_arr em outro array mestre com a função 
              concat.apply(), e armazená-la dentro de outra variável chamada meteors**/
              meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 100000000
                element.threat_score = threatScore;
            });
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Tela de Meteoros!</Text>
                </View>
            )
        }
    }