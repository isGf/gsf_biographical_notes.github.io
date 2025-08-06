# Unity 模拟放大镜效果

## 目录
- [实现思路](#实现思路)
- [Shader实现](#shader实现)
- [后处理方案](#后处理方案)
- [交互控制](#交互控制)
- [性能优化](#性能优化)

## 实现思路

放大镜效果可以通过两种方式实现：
1. 使用自定义Shader放大特定区域
2. 使用RenderTexture和后处理效果

## Shader实现

### 基础放大Shader
```shader
Shader "Custom/Magnifier"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _MagnifierCenter ("Magnifier Center", Vector) = (0.5, 0.5, 0, 0)
        _MagnifierRadius ("Magnifier Radius", Float) = 0.2
        _MagnifierStrength ("Magnifier Strength", Float) = 2.0
    }
    
    SubShader
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
            
            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };
            
            sampler2D _MainTex;
            float4 _MagnifierCenter;
            float _MagnifierRadius;
            float _MagnifierStrength;
            
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                float2 uv = i.uv;
                float2 center = _MagnifierCenter.xy;
                float dist = distance(uv, center);
                
                if (dist < _MagnifierRadius)
                {
                    float2 offset = uv - center;
                    offset *= _MagnifierStrength;
                    uv = center + offset;
                }
                
                return tex2D(_MainTex, uv);
            }
            ENDCG
        }
    }
}
```

## 后处理方案

（内容待补充）

## 交互控制

（内容待补充）

## 性能优化

（内容待补充）

---

> 💡 **提示**
> 对于移动平台，建议使用RenderTexture方案以获得更好的性能。

> 如果这篇文章对你有帮助，请点个赞支持一下！ ❤️