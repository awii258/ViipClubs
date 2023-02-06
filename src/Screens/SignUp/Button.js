import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions, Image } from "react-native";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


function Button({ title, onPress, bgColor, borderColor, textColor, icon }) {

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: bgColor, borderColor: borderColor }]}
            onPress={onPress}
        >
            <Image style={{ right: 5, top: -4 }}
                source={icon} />
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
    k;
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        width: WIDTH / 1.10,
        height: 48,
        marginTop: 19,
        borderWidth: 1,
        height: 55,
        flexDirection: 'row',

    },
    text: {
        fontSize: 14,
        fontFamily: "poppinsRegular",
    },
});

export default Button;
