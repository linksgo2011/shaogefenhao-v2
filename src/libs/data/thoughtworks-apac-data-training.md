---
title: Data Engineering Accelerated
toc: true
date: 2024-03-18 09:18:35
---

## Scale up and scale out



## Understand Time Windows 


## final solution 

Option1: 

Target: 网络热点消退时间周期？

- 怎么定义网络热点：找几个典型的网络事件消退周期，例如：鸭脖事件、

Option2: 空气质量和季节之间的关系？

Option3: 商品销量和假期之间的关系?

Option4: 用户网络购物都在几点？

Option5: 全球灾难之间的关系 Scars of the Earth: Over 22 Million Disasters？

Option5：服装销售和折扣的关系？

## build final solution data

```python
%sh pip install kaggle
%sh
export KAGGLE_USERNAME=linksgo2011
export KAGGLE_KEY=20f9d4c5726970fac4aaebdbd8184fb0

kaggle datasets download -d guillemservera/global-daily-climate-data

%sh unzip global-daily-climate-data.zip

%sh ls global-daily-climate-data
```

Create DF

```python
from pyspark.sql import DataFrame
from pyspark.sql.types import *

def create_cities_dataframe(filepath: str) -> DataFrame:
    custom_schema = StructType([
        StructField("station_id", StringType(), True),
        StructField("city_name", IntegerType(), True),
        StructField("country", StringType(), True),
        StructField("state", StringType(), True),
        StructField("iso2", StringType(), True),
        StructField("iso3", StringType(), True),
        StructField("latitude", FloatType(), True),
        StructField("longitude", FloatType(), True),
    ])
    
    df = spark.read.format("csv") \
        .option("header", True) \
        .option("delimiter", ",") \
        .option("escape", "\\") \
        .schema(custom_schema) \
        .load(filepath)
    return df

def create_countires_dataframe(filepath: str) -> DataFrame:
    custom_schema = StructType([
        StructField("iso3", StringType(), True),
        StructField("country", IntegerType(), True),
        StructField("native_name", StringType(), True),
        StructField("iso2", StringType(), True),
        StructField("population", StringType(), True),
        StructField("area", StringType(), True),
        StructField("capital", StringType(), True),
        StructField("capital_lat", StringType(), True),
        StructField("capital_lng", StringType(), True),
        StructField("region", StringType(), True),
        StructField("continent", StringType(), True),
        StructField("hemisphere", StringType(), True)
    ])
    
    df = spark.read.format("csv") \
        .option("header", True) \
        .option("delimiter", ",") \
        .option("escape", "\\") \
        .schema(custom_schema) \
        .load(filepath)
    return df

def create_daily_weather_dataframe(filepath: str) -> DataFrame:
    df = spark.read.format("parquet")
        .load(filepath)
    return df   
    
df = create_cities_dataframe(filepath)

```

