const contentSerlo =
  [[{
    "col": 24,
    "content": "Aufgrund der [Kongruenzsätze](/1925) reicht es für die eindeutige Konstruktion eines Dreiecks aus, wenn man nur 3 Eigenschaften (also Längen der Seite oder Größe der Winkel) des Dreiecks kennt.\n\nEin Dreieck ist eindeutig konstruierbar, wenn man\n\n- die Längen aller 3 Seiten (SSS-Satz) oder\n\n- die Länge zweier Seiten und die Größe des von Ihnen eingeschlossenen Winkels (SWS-Satz) oder\n\n- die Länge einer Seite und die Größe der anliegenden Winkel (WSW-Satz) oder\n\n- die Längen zweier Seiten und die Größe des der längeren der beiden Seiten gegenüberliegenden Winkels (SsW-Satz)\n\nkennt."
  }], [{
    "col": 24,
    "content": "## Vorgehen bei der Konstrukion\n\nAls konkretes Beispiel wird jetzt gewählt: Konstruktion eines Dreiecks mit Seitenlängen %%a=3\\;cm;\\;\\;\\;b=\\;4\\;cm;\\;\\;c=\\;5\\;cm\\;%%"
  }], [{
    "col": 12,
    "content": "Zu allererst fertigt man eine Skizze/Planfigur an. Man zeichnet dazu ein beliebiges Dreieck, bei dem die Winkel und Längen nicht mit den Angaben übereinstimmen müssen, aber die Namen der Seiten und Winkel angegeben werden."
  }, {
    "col": 12,
    "content": "![legacy geogebra formula](/assets/pic1.png)"
  }], [{
    "col": 12,
    "content": "Man markiert nun die bekannten Größen und erkennt, ob die Angaben die Voraussetzungen eines Kongruenzsatzes erfüllen. Jetzt weiß man auch, ob man das Dreieck eindeutig konstruieren kann.\n\n(in diesem Beispiel: SSS-Satz %%\\rightarrow%% eindeutig konstruierbar)"
  }, {
    "col": 12,
    "content": "![legacy geogebra formula](/assets/pic2.png)"
  }], [{
    "col": 12,
    "content": "Nun folgt die eigentliche Konstruktion. Es gibt immer unterschiedliche Herangehensweisen für die Konstruktion."
  }, {
    "col": 12,
    "content": "- Beginne immer mit einer Seite und konstruiere dann die weiteren gegebenen Winkel oder Seiten.\n\n- Seitenlängen werden immer mit dem Zirkel eingetragen\n\n- Winkel müssen je nach Angabe konstruiert werden oder dürfen mit dem Geodreieck gezeichnet werden"
  }], [{
    "col": 24,
    "content": "## Die Dreiecksungleichungen\n\nFür jedes Dreieck gilt:\n\nDie Länge einer Dreiecksseite muss immer kleiner sein als die Summe der Längen der anderen beiden Seiten.\n\nFormal aufgeschrieben:\n\n- %%a < b + c%%\n- %%b < a + c%%\n- %%c < a + b%%\n\nDiese Ungleichungen sind besonders wichtig, wenn man drei Seitenlängen gegeben hat.Erfüllen die Angaben die Dreiecksungleichungen nicht, dann gibt es kein solches Dreieck.Es reicht aus, wenn man überprüft, ob die größte Seite kleiner als die Summe der anderen beiden Seiten ist. Damit sind die anderen beiden Ungleichungen automatisch auch erfüllt."
  }], [{
    "col": 24,
    "content": "## Konstruktionsbeispiele\n\nKonstruiere ein Dreieck mit den Seitenlängen %%a=3\\;cm;\\;\\;\\;b=\\;4\\;cm;\\;\\;c=\\;5\\;cm\\;%%\n\n1. Zeichne eine Gerade und wähle darauf den Punkt A des Dreiecks aus.\n\n2. Zeichne einen Kreis um A, dessen Radius genauso groß ist wie die Seite c.\n\n3. Der Schnittpunkt der Geraden und des Kreises ist der Eckpunkt B.\n\n4. Zeichne einen Kreis um B, dessen Radius so groß ist wie die Seite a.\n\n5. Zeichne einen Kreis um A, dessen Radius so groß ist wie die Seite b.\n\n6. Der Schnittpunkt der beiden Kreise ist der Punkt C des Dreiecks.\n\n\n\n>[Dreiecke konstruieren](ggt/1571395)"
  }], [{
    "col": 24,
    "content": "/// Weitere Beispielaufgaben\n>[Übungsaufgabe1](/1)\n>[Übungsaufgabe2](/2)\n///"
  }]
  ]

export default contentSerlo
