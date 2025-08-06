# Stable Diffusion 本地部署

## 前置条件

- 本文档在基于Windows10的本地电脑上部署StableDiffusion。
- 前置条件：确保已安装Cuda、Python3.10并且可正常运行

## 下载源码

https://github.com/AUTOMATIC1111/stable-diffusion-webui

## 修改批处理文件

1.将下载的源码包解压缩后进入路径stable-diffusion-webui-master

   ![步骤1](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-01.png)

2.找到并编辑webui.bat文件

   ![步骤2](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-02.png)

3.在文件中插入代码set COMMANDLINE_ARGS=--no-gradio-queue

   ![步骤3](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-03.png)

## 运行批处理文件

运行webui.bat文件，自动下载文件，下载完后自动进入到浏览器界面

![步骤4](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-04.png)

![步骤5](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-05.png)

## 测试文生图

1.选择SD自带的文生图模型

   ![步骤6](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-06.png)

2.输入提示词，选择参数

3.点击生成按钮
   ![步骤7](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-07.png)

## 安装中文包

1.在webui界面选择Extensions（扩展）选项卡，选择选择Install From URL选项卡
   ![步骤8](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-08.png)
2.填入中文包地址https://github.com/VinsonLaro/stable-diffusion-webui-chinese点击Install下载
   ![步骤9](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-09.png)
3.下载完成后选择Settings（设置）选项卡，进入User interface子选项卡，选择Chinese（中文）界面
   ![步骤10](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-10.png)
4.在Localization中选择中文包，如果没有中文包点一下右侧刷新即可
   ![步骤11](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-11.png)
5.点击Apply settings，刷新页面，设置完成
   ![步骤12](../../../blogs/imgs/AI/01 Stable Diffusion 本地部署-12.png)