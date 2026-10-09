window.OUTPUTS = {
  "1": {
    "stdout": "Mon premier TP de régression\nPython : 3.12.6\nCalcul de contrôle : 5\n",
    "tables": [],
    "figures": []
  },
  "2": {
    "stdout": "Surface : 60 m²\nPrix par m² : 12000.0 DH/m²\n<class 'int'> <class 'float'>\n",
    "tables": [],
    "figures": []
  },
  "3": {
    "stdout": "Liste × 2 : [40, 60, 80, 40, 60, 80]\nTableau × 2 : [ 80. 120. 160.]\nDimensions : (3,)\n",
    "tables": [],
    "figures": []
  },
  "4": {
    "stdout": "Lignes, colonnes : (20, 2)\n",
    "tables": [
      "<table class=\"dataframe result-table\">\n  <thead>\n    <tr style=\"text-align: right;\">\n      <th></th>\n      <th>surface_m2</th>\n      <th>prix_kdh</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>30</td>\n      <td>390</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>35</td>\n      <td>405</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>40</td>\n      <td>475</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>45</td>\n      <td>480</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>50</td>\n      <td>555</td>\n    </tr>\n  </tbody>\n</table>"
    ],
    "figures": []
  },
  "5": {
    "stdout": "surface_m2    int64\nprix_kdh      int64\ndtype: object\nValeurs manquantes :\nsurface_m2    0\nprix_kdh      0\ndtype: int64\nDoublons : 0\nSurfaces positives : True\n",
    "tables": [],
    "figures": []
  },
  "6": {
    "stdout": "Médiane des surfaces : 77.5\nPrix moyen : 764.75 kDH\n",
    "tables": [
      "<table class=\"dataframe result-table\">\n  <thead>\n    <tr style=\"text-align: right;\">\n      <th></th>\n      <th>surface_m2</th>\n      <th>prix_kdh</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>count</th>\n      <td>20.00</td>\n      <td>20.00</td>\n    </tr>\n    <tr>\n      <th>mean</th>\n      <td>77.50</td>\n      <td>764.75</td>\n    </tr>\n    <tr>\n      <th>std</th>\n      <td>29.58</td>\n      <td>241.10</td>\n    </tr>\n    <tr>\n      <th>min</th>\n      <td>30.00</td>\n      <td>390.00</td>\n    </tr>\n    <tr>\n      <th>25%</th>\n      <td>53.75</td>\n      <td>562.50</td>\n    </tr>\n    <tr>\n      <th>50%</th>\n      <td>77.50</td>\n      <td>770.00</td>\n    </tr>\n    <tr>\n      <th>75%</th>\n      <td>101.25</td>\n      <td>971.25</td>\n    </tr>\n    <tr>\n      <th>max</th>\n      <td>125.00</td>\n      <td>1135.00</td>\n    </tr>\n  </tbody>\n</table>"
    ],
    "figures": []
  },
  "7": {
    "stdout": "",
    "tables": [],
    "figures": [
      "figures/q07.svg"
    ]
  },
  "8": {
    "stdout": "Corrélation : 0.998\nContrôles structurels réussis\n",
    "tables": [],
    "figures": []
  },
  "9": {
    "stdout": "Apprentissage : 15 — Test : 5\nSurfaces de test : [ 40.  60.  80. 100. 120.]\n",
    "tables": [],
    "figures": []
  },
  "10": {
    "stdout": "Prix de référence : 752.0 kDH\nPrédictions : [752. 752. 752. 752. 752.]\n",
    "tables": [],
    "figures": []
  },
  "11": {
    "stdout": "[500. 740. 900.] kDH\n",
    "tables": [],
    "figures": []
  },
  "12": {
    "stdout": "Premier résidu : 50.0 kDH\nMSE d'essai : 1650.0 kDH²\n",
    "tables": [],
    "figures": []
  },
  "13": {
    "stdout": "Pente : 8.106 kDH/m²\n",
    "tables": [],
    "figures": []
  },
  "14": {
    "stdout": "Ordonnée à l'origine : 130.54 kDH\nPrédiction au centre : 752.0\nPrix moyen : 752.0\n",
    "tables": [],
    "figures": []
  },
  "15": {
    "stdout": "",
    "tables": [],
    "figures": [
      "figures/q15.svg"
    ]
  },
  "16": {
    "stdout": "MSE essai : 1650.0\nMSE ajustée : 145.47\nRésidu moyen : 0.0\n",
    "tables": [],
    "figures": []
  },
  "17": {
    "stdout": "",
    "tables": [
      "<table class=\"dataframe result-table\">\n  <thead>\n    <tr style=\"text-align: right;\">\n      <th></th>\n      <th>surface_m2</th>\n      <th>observe_kdh</th>\n      <th>predit_kdh</th>\n      <th>residu_kdh</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>40.0</td>\n      <td>475.0</td>\n      <td>454.78</td>\n      <td>20.22</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>60.0</td>\n      <td>640.0</td>\n      <td>616.90</td>\n      <td>23.10</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>80.0</td>\n      <td>805.0</td>\n      <td>779.02</td>\n      <td>25.98</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>100.0</td>\n      <td>970.0</td>\n      <td>941.14</td>\n      <td>28.86</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>120.0</td>\n      <td>1125.0</td>\n      <td>1103.26</td>\n      <td>21.74</td>\n    </tr>\n  </tbody>\n</table>"
    ],
    "figures": []
  },
  "18": {
    "stdout": "MAE : 23.98 kDH\nRMSE : 24.18 kDH\nMAE : 23980 DH\n",
    "tables": [],
    "figures": []
  },
  "19": {
    "stdout": "MAE référence : 206.6 kDH\nMAE modèle : 23.98 kDH\nR² test : 0.989\n",
    "tables": [],
    "figures": []
  },
  "20": {
    "stdout": "",
    "tables": [],
    "figures": [
      "figures/q20.svg"
    ]
  },
  "21": {
    "stdout": "82 m² → 795.23 kDH | Interpolation : True\n200 m² → 1751.74 kDH | Interpolation : False\n",
    "tables": [],
    "figures": []
  },
  "22": {
    "stdout": "Pentes initiale / perturbée : 8.11 16.83\nPrix à 80 m² : 779.02 / 959.42\n",
    "tables": [],
    "figures": []
  },
  "23": {
    "stdout": "",
    "tables": [
      "<table class=\"dataframe result-table\">\n  <thead>\n    <tr style=\"text-align: right;\">\n      <th></th>\n      <th>surface_m2</th>\n      <th>prix_kdh</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>32</td>\n      <td>370</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>40</td>\n      <td>415</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>48</td>\n      <td>500</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>56</td>\n      <td>545</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>64</td>\n      <td>635</td>\n    </tr>\n  </tbody>\n</table>"
    ],
    "figures": []
  },
  "24": {
    "stdout": "Versions utilisées\nPython : 3.12.6\nNumPy : 2.4.2\nPandas : 2.2.3\nMatplotlib : 3.10.0\nFin du TP — relire les interprétations avant de remettre le notebook.\n",
    "tables": [],
    "figures": []
  }
};
