# Unity 自用工具静态类

## Tools.cs

```cs
using DG.Tweening.Core;
using DG.Tweening.Plugins.Options;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using Object = UnityEngine.Object;


public static class GSF_Tools
{

    #region 延迟方法

    /// 延迟对象
    public static Transform transform;

    /// 延迟方法到指定时间执行
    public static void waitToUnloadAssetWrap(Action action, float delaySeconds)
    {
        MonoBehaviour owner = transform.GetComponent<MonoBehaviour>();
        owner.StartCoroutine(DelayFuc(action, delaySeconds));
    }

    private static IEnumerator DelayFuc(Action action, float delaySeconds)
    {
        yield return new WaitForSeconds(delaySeconds);
        action();
    }


    /// 每多少秒循环执行一次
    public static void waitToUnloadLoopAssetWrap(Action action, float delaySeconds)
    {
        MonoBehaviour owner = transform.GetComponent<MonoBehaviour>();
        owner.StartCoroutine(DelayLoopFuc(action, delaySeconds));
    }

    private static IEnumerator DelayLoopFuc(Action action, float delaySeconds)
    {
        while (true)
        {
            yield return new WaitForSeconds(delaySeconds);
            action();
        }
    }

    /// 关掉所有协程
    public static void StopAllAssetWrap()
    {
        MonoBehaviour owner = transform.GetComponent<MonoBehaviour>();
        owner.StopAllCoroutines();
    }

    #endregion

    #region 场景加载

    /// 加载场景
    public static void LoadScene(string sceneName)
    {
        bool flag = false;
        foreach (var item in GetAllSceneName())
        {
            if (sceneName == item)
            {
                flag = true;
            }
        }

        if (!flag)
        {
            Debug.LogError("File->BuildSettings 中没有名字为 " + "'" + sceneName + "'" + " 的场景");
            return;
        }

        Debug.Log("---已加载'" + sceneName + "'场景---");
        SceneManager.LoadScene(sceneName);
    }

    /// 获取所有场景名字
    private static string[] GetAllSceneName()
    {
        int count = SceneManager.sceneCountInBuildSettings;
        string[] scene_names = new string[count];
        for (int i = 0; i < count; i++)
        {
            scene_names[i] = SceneUtility.GetScenePathByBuildIndex(i);
            string[] strs = scene_names[i].Split('/');
            string str = strs[strs.Length - 1];
            strs = str.Split('.');
            str = strs[0];
            scene_names[i] = str;
        }

        return scene_names;
    }

    #endregion

    #region 随机字符
    /// 生成随机字符
    public static string RandomCharacters()
    {
        string str = string.Empty;
        long num2 = DateTime.Now.Ticks + 0;
        System.Random random = new System.Random(((int)(((ulong)num2) & 0xffffffffL)) | ((int)(num2 >> 1)));
        for (int i = 0; i < 20; i++)
        {
            char ch;
            int num = random.Next();
            if ((num % 2) == 0)
            {
                ch = (char)(0x30 + ((ushort)(num % 10)));
            }
            else
            {
                ch = (char)(0x41 + ((ushort)(num % 0x1a)));
            }

            str = str + ch.ToString();
        }

        return str;
    }

    /// 获取字符串的MD5
    public static string Md5String(string source)
    {
        MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
        byte[] data = System.Text.Encoding.UTF8.GetBytes(source);
        byte[] md5Data = md5.ComputeHash(data, 0, data.Length);
        md5.Clear();

        string destString = "";
        for (int i = 0; i < md5Data.Length; i++)
        {
            destString += System.Convert.ToString(md5Data[i], 16).PadLeft(2, '0');
        }

        destString = destString.PadLeft(32, '0');
        return destString;
    }

    #endregion 随机字符

    #region IO类操作

    /// 写文件
    public static void WriteFile(string pathName, string info)
    {
        StreamWriter sw;
        FileInfo fi = new FileInfo(pathName);
        sw = fi.CreateText();
        sw.WriteLine(info);
        sw.Close();
        sw.Dispose();
    }

    /// 读文件
    public static string ReadFile(string pathName)
    {
        StreamReader sr;
        FileInfo fi = new FileInfo(pathName);
        sr = fi.OpenText();
        string info = sr.ReadToEnd();
        sr.Close();
        sr.Dispose();
        return info;
    }

    #endregion

    #region 组件方法

    /// 获取物体名下的 T 组件
    public static T FindT<T>(string namestring)
    {
        if (GameObject.Find(namestring) != null)
        {
            return GameObject.Find(namestring).GetComponent<T>();
        }

        return default;
    }

    /// 移除物体上的 T 组件
    public static void Remove<T>(GameObject obj)
    {
        if (obj.GetComponent<T>() == null)
        {
            Debug.LogError("当前 " + obj.name.ToString() + " 上没有这个组件", obj);
            return;
        }

        UnityEngine.Object.Destroy(obj.GetComponent<T>() as UnityEngine.Object);
    }

    /// 获取数组自身的 Object
    public static GameObject GetArrayThisObj(this GameObject[] obj)
    {
        if (obj.Length >= 1)
        {
            return obj[0].transform.parent.gameObject;
        }
        Debug.LogError("ThisArrayObjChild == none");
        return null;
    }
    public static Transform GetArrayThisObj(this Transform[] obj, string parentName)
    {
        if (obj.Length >= 1)
        {
            if (obj[0].transform.parent.name == parentName)
            {
                return obj[0].transform.parent;
            }
            if (obj[0].transform.parent.parent.name == parentName)
            {
                return obj[0].transform.parent.parent;
            }
            if (obj[0].transform.parent.parent.parent.name == parentName)
            {
                return obj[0].transform.parent.parent.parent;
            }
        }
        Debug.LogError("ThisArrayObjChild == none");
        return null;
    }

    #endregion

    #region 子物体获取

    /// 获取父物体下面的所有子对象 返回类型为List
    public static List<GameObject> GetChildToList(this Transform obj)
    {
        List<GameObject> tempArrayobj = new List<GameObject>();
        foreach (Transform child in obj)
        {
            tempArrayobj.Add(child.gameObject);
        }

        return tempArrayobj;
    }

    /// 获取父物体下面的所有子对象 返回类型为List
    public static List<GameObject> GetChildToList(this GameObject obj)
    {
        List<GameObject> tempArrayobj = new List<GameObject>();
        foreach (Transform child in obj.transform)
        {
            tempArrayobj.Add(child.gameObject);
        }

        return tempArrayobj;
    }

    /// 获取父物体下面的所有子对象 返回类型为数组
    public static GameObject[] GetChildToArray(this GameObject obj)
    {
        List<GameObject> tempArrayobj = new List<GameObject>();
        foreach (Transform child in obj.transform)
        {
            tempArrayobj.Add(child.gameObject);
        }

        GameObject[] tempArraobj2 = tempArrayobj.ToArray();
        return tempArraobj2;
    }

    /// 获取父物体下面的所有子对象 返回类型为数组
    public static GameObject[] GetChildToArray(this Transform obj)
    {
        List<GameObject> tempArrayobj = new List<GameObject>();
        foreach (Transform child in obj.transform)
        {
            tempArrayobj.Add(child.gameObject);
        }

        GameObject[] tempArraobj2 = tempArrayobj.ToArray();
        return tempArraobj2;
    }

    /// 在当前物体下多级查找子物体
    public static Transform FindTheChild(GameObject goParent, string childName)
    {
        var searchTrans = goParent.transform.Find(childName);
        if (searchTrans == null)
        {
            foreach (Transform trans in goParent.transform)
            {
                searchTrans = FindTheChild(trans.gameObject, childName);
                if (searchTrans != null)
                {
                    return searchTrans;
                }
            }
        }

        return searchTrans;
    }

    #endregion

    #region 字符操作

    /// 将一个数组转换为字符串并拼接
    public static string ArrayToString<T>(T[] tarray, string splitestr = "")
    {
        string arrayString = "";
        for (int i = 0; i < tarray.Length; i++)
        {
            arrayString += tarray[i] + ((i == tarray.Length - 1) ? "" : splitestr);
        }

        return arrayString;
    }

    /// 将一个字符串转换为一个字节数组
    public static byte[] StringToByteArray(string msg)
    {
        return System.Text.Encoding.UTF8.GetBytes(msg);
    }

    /// 字节数组转换为字符串
    public static string ByteArrayToString(byte[] byteArray)
    {
        return System.Text.Encoding.UTF8.GetString(byteArray);
    }

    /// 在字符串的指定位置插入一个字符
    public static string Insert(string strString, string inStr, int inIndex)
    {
        if (inIndex > strString.Length)
        {
            Debug.LogError("插入位置大于字符串长度");
            return "";
        }

        strString = strString.Insert(inIndex, inStr);
        return strString;
    }

    #endregion

    #region 坐标转换

    /// 对指定2DUI的坐标系转为世界坐标
    public static Vector3 UIScreenToWorldPoint(Vector3 uiPostion)
    {
        uiPostion = Camera.main.WorldToScreenPoint(uiPostion);
        uiPostion = Camera.main.ScreenToWorldPoint(uiPostion);
        return uiPostion;
    }

    #endregion

    #region 资源加载方法

    /// 加载Resource资源
    public static GameObject LoadResourcePrefab(string prefabName, string path = "")
    {
        return (GameObject)Resources.Load(path + prefabName);
    }

    #endregion


}

/// 原始类扩展
/// 例：gameObject.SetActive(bool); —> transform.SetActive(bool);
public static class GsfExtensions
{
    public static void SetPositionX(this Transform t, float newX)
    {
        t.position = new Vector3(newX, t.position.y, t.position.z);
    }

    public static void SetPositionY(this Transform t, float newY)
    {
        t.position = new Vector3(t.position.x, newY, t.position.z);
    }

    public static void SetPositionZ(this Transform t, float newZ)
    {
        t.position = new Vector3(t.position.x, t.position.y, newZ);
    }

    public static float GetPositionX(this Transform t)
    {
        return t.position.x;
    }

    public static float GetPositionY(this Transform t)
    {
        return t.position.y;
    }

    public static float GetPositionZ(this Transform t)
    {
        return t.position.z;
    }

    public static void SetActive(this Transform t, bool flag)
    {
        t.gameObject.SetActive(flag);
    }

    public static void SetActive(this Image t, bool flag)
    {
        t.gameObject.SetActive(flag);
    }

    public static (GameObject, Transform) SetActiveMeshRenderer(this GameObject g, bool flag)
    {
        if (g.GetComponent<MeshRenderer>() != null)
        {
            g.GetComponent<MeshRenderer>().enabled = flag;
        }
        if (g.GetComponent<SkinnedMeshRenderer>() != null)
        {
            g.GetComponent<SkinnedMeshRenderer>().enabled = flag;
        }
        return (g, g.transform);
    }

    public static void DoMoveAndRot(this GameObject t, Vector3 vector3Pos, Vector3 vector3Rot, float rotTime = 2, float posTime = 2)
    {
        t.transform.DOMove(vector3Pos, posTime);
        t.transform.DORotate(vector3Rot, rotTime);
    }
    public static void DoLocalMoveAndLocalRot(this GameObject t, Vector3 vector3Pos, Vector3 vector3Rot, float rotTime = 2, float posTime = 2)
    {
        t.transform.DoLocalMove(vector3Pos, posTime);
        t.transform.DOLocalRotate(vector3Rot, rotTime);
    }
    public static void DoMove(this GameObject t, Vector3 vector3, float time)
    {
        t.transform.DOMove(vector3, time);
    }
    public static void DoMoveX(this GameObject t, float x, float time)
    {
        t.transform.DOMoveX(x, time);
    }

    public static void DoMoveY(this GameObject t, float y, float time)
    {
        t.transform.DOMoveY(y, time);
    }

    public static void DoMoveZ(this GameObject t, float z, float time)
    {
        t.transform.DOMoveZ(z, time);
    }

    public static void DoLocalMove(this GameObject t, Vector3 vector3, float time)
    {
        t.transform.DOLocalMove(vector3, time);
    }

    public static void DoLocalMoveX(this GameObject t, float vector3, float time)
    {
        t.transform.DOLocalMoveX(vector3, time);
    }

    public static void DoLocalMoveY(this GameObject t, float vector3, float time)
    {
        t.transform.DOLocalMoveY(vector3, time);
    }

    public static void DoLocalMoveZ(this GameObject t, float vector3, float time)
    {
        t.transform.DOLocalMoveZ(vector3, time);
    }

    public static void DoLocalRot(this GameObject t, Vector3 vector3, float time)
    {
        t.transform.DOLocalRotate(vector3, time);
    }
    public static void DoLocalRotZ(this GameObject t, float z, float time)
    {
        t.transform.DOLocalRotate(new Vector3(t.transform.localEulerAngles.x, t.transform.localEulerAngles.y, z), time);
    }
    public static void DoLocalRotX(this GameObject t, float x, float time)
    {
        t.transform.DOLocalRotate(new Vector3(x, t.transform.localEulerAngles.y, t.transform.localEulerAngles.z), time);
    }
    public static void DoLocalRotX(this Transform t, float x, float time)
    {
        t.transform.DOLocalRotate(new Vector3(x, t.transform.localEulerAngles.y, t.transform.localEulerAngles.z), time);
    }
    public static void DoLocalRotY(this GameObject t, float y, float time)
    {
        t.transform.DOLocalRotate(new Vector3(t.transform.localEulerAngles.x, y, t.transform.localEulerAngles.z), time);
    }
    public static void DoLocalRotY(this Transform t, float y, float time)
    {
        t.DOLocalRotate(new Vector3(t.transform.localEulerAngles.x, y, t.transform.localEulerAngles.z), time);
    }
    public static void DoLocalRotZ(this Transform t, float z, float time)
    {
        t.DOLocalRotate(new Vector3(t.transform.localEulerAngles.x, t.transform.localEulerAngles.y, z), time);
    }
    public static void DoRot(this GameObject t, Vector3 vector3, float time)
    {
        t.transform.DORotate(vector3, time);
    }
    public static void DoRot(this Transform t, Vector3 vector3, float time)
    {
        t.transform.DORotate(vector3, time);
    }

    public static void DoScale(this GameObject t, Vector3 scale, float time)
    {
        t.transform.DOScale(scale, time);
    }

    public static void DoScaleX(this GameObject t, float x, float time)
    {
        t.transform.DOScale(new Vector3(x, t.transform.localScale.y, t.transform.localScale.z), time);
    }

    public static void DoScaleY(this GameObject t, float y, float time)
    {
        t.transform.DOScale(new Vector3(t.transform.localScale.x, y, t.transform.localScale.z), time);
    }

    public static void DoScaleZ(this GameObject t, float z, float time)
    {
        t.transform.DOScale(new Vector3(t.transform.localScale.x, t.transform.localScale.y, z), time);
    }

    public static void DoResetTransform(this Transform t, Vector3 resetV3, float time)
    {
        t.transform.DOMove(resetV3, time);
        t.transform.DORotate(resetV3, time - time / 1.5f);
    }
    public static void DoResetTransform(this Transform t, Vector3 resetP3, Vector3 resetR3, float time)
    {
        t.transform.DOMove(resetP3, time);
        t.transform.DORotate(resetR3, time - time / 1.5f);
    }

    public static void DoMove(this Transform t, Vector3 vector3, float time)
    {
        t.transform.DOMove(vector3, time);
    }

    public static void DoMoveX(this Transform t, float x, float time)
    {
        t.transform.DOMoveX(x, time);
    }

    public static void DoMoveY(this Transform t, float y, float time)
    {
        t.transform.DOMoveY(y, time);
    }

    public static void DoMoveZ(this Transform t, float z, float time)
    {
        t.transform.DOMoveZ(z, time);
    }

    public static void DoLocalMove(this Transform t, Vector3 vector3, float time)
    {
        t.transform.DOLocalMove(vector3, time);
    }

    public static void DoLocalMoveX(this Transform t, float vector3, float time)
    {
        t.transform.DOLocalMoveX(vector3, time);
    }

    public static void DoLocalMoveY(this Transform t, float vector3, float time)
    {
        t.transform.DOLocalMoveY(vector3, time);
    }

    public static void DoLocalMoveZ(this Transform t, float vector3, float time)
    {
        t.transform.DOLocalMoveZ(vector3, time);
    }

    public static void DoScale(this Transform t, Vector3 scale, float time)
    {
        t.transform.DOScale(scale, time);
    }

    public static void SetDoPos_Ros(this Transform _tran, Transform _Pos, float speed = 0.5f)
    {
        _tran.DOMove(_Pos.position, speed).SetEase(Ease.Linear);
        _tran.DORotateQuaternion(_Pos.rotation, speed).SetEase(Ease.Linear);
    }

}
```

## 调用示例

```cs
public class Test : MonoBehaviour
{
    void Start()
    {
        Tools.transform = transform;
        Tools.waitToUnloadAssetWrap(() => {
            Debug.Log("延迟执行");
        }, 2f);
    }
}
