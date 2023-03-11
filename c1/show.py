
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import json


#plt.plot([1, 2, 3, 4], 'o-r')
#plt.ylabel('some numbers')
#plt.show()

import requests
response = requests.get("http://192.168.140.53:5000/readAPI").json()
pd1 = pd.DataFrame(response)
print(pd1)

plt.plot(range(0,30),range(0,30))
plt.xticks(np.arange(0, 30, 1.0))
plt.yticks(np.arange(0, 30, 1.0))
#plt.xlim(0,30)
for count,value in enumerate(response):
    plt.scatter(count,value, color = '#88c999')
plt.show()