# Unity 实现可控音频进度条

## 目录
- [需求分析](#需求分析)
- [UI设计](#ui设计)
- [音频控制](#音频控制)
- [进度条实现](#进度条实现)
- [交互逻辑](#交互逻辑)
- [优化建议](#优化建议)

## 需求分析

在Unity中实现一个可以拖拽的音频进度条，支持播放、暂停、拖拽调整进度等功能。

## UI设计

### 所需组件
- Slider组件（作为进度条）
- Button组件（播放/暂停按钮）
- Text组件（显示时间信息）
- AudioSource组件（音频播放）

### UI布局结构
```
AudioPlayer
├── Background
├── ProgressSlider
├── PlayButton
├── PauseButton
└── TimeText
```

## 音频控制

### 基础音频播放
```csharp
public class AudioController : MonoBehaviour
{
    public AudioSource audioSource;
    public Slider progressSlider;
    public Text timeText;
    
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
        progressSlider.maxValue = audioSource.clip.length;
    }
    
    public void Play()
    {
        audioSource.Play();
    }
    
    public void Pause()
    {
        audioSource.Pause();
    }
    
    public void Stop()
    {
        audioSource.Stop();
    }
}
```

## 进度条实现

### 更新进度条
```csharp
void Update()
{
    if (audioSource.isPlaying)
    {
        progressSlider.value = audioSource.time;
        UpdateTimeText();
    }
}

void UpdateTimeText()
{
    float currentTime = audioSource.time;
    float totalTime = audioSource.clip.length;
    
    string currentTimeStr = FormatTime(currentTime);
    string totalTimeStr = FormatTime(totalTime);
    
    timeText.text = $"{currentTimeStr} / {totalTimeStr}";
}

string FormatTime(float timeInSeconds)
{
    int minutes = Mathf.FloorToInt(timeInSeconds / 60);
    int seconds = Mathf.FloorToInt(timeInSeconds % 60);
    return $"{minutes:00}:{seconds:00}";
}
```

## 交互逻辑

### 拖拽调整进度
```csharp
public void OnSliderValueChanged()
{
    if (!audioSource.isPlaying)
    {
        audioSource.time = progressSlider.value;
    }
}

public void OnSliderEndDrag()
{
    audioSource.time = progressSlider.value;
}
```

## 优化建议

（内容待补充）

---

> 💡 **提示**
> 记得在Slider组件上添加事件监听，确保拖拽时能够正确更新音频进度。

> 如果这篇文章对你有帮助，请点个赞支持一下！ ❤️