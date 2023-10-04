import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalPopup from "../ModalPopup/ModalPopup";

const NoQuizModal = (modalOpen, modalToggle) => {
	return (
		<ModalPopup modalOpen={modalOpen} modalToggle={modalToggle}></ModalPopup>
	);
};

export default NoQuizModal;

const styles = StyleSheet.create({});
