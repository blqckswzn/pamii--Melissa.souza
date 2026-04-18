import { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Brightness from 'expo-brightness';

export default function Index() {

  // Pede permissão de brilho no Android ao abrir o app
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de brilho negada!');
      }
    })();
  }, []);

  // API 1: Haptics
  const vibracaoLeve = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const vibracaoForte = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const vibracaoSucesso = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // API 2: Brightness
  const deixarClaro = async () => {
    await Brightness.setBrightnessAsync(1.0);
  };

  const deixarEscuro = async () => {
    await Brightness.setBrightnessAsync(0.1);
  };

  const resetarBrilho = async () => {
    await Brightness.useSystemBrightnessAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Demonstração de APIs Expo</Text>

      <Text style={styles.subtitulo}>API 1 — Haptics</Text>
      <Button title="Vibração leve" onPress={vibracaoLeve} />
      <Button title="Vibração forte" onPress={vibracaoForte} />
      <Button title="Vibração de sucesso" onPress={vibracaoSucesso} />

      <Text style={styles.subtitulo}>API 2 — Brightness</Text>
      <Button title="Brilho máximo" onPress={deixarClaro} />
      <Button title="Brilho mínimo" onPress={deixarEscuro} />
      <Button title="Resetar brilho" onPress={resetarBrilho} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  subtitulo: { fontSize: 16, marginTop: 16, color: '#555' },
});