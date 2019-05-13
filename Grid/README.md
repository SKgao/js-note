# grid 布局

-------------------------------------------

## grid-template-columns, grid-template-rows

### 1. repeat()

<p>有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值</p>
<p>repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。</p>
<pre>grid-template-columns: repeat(3, 33.33%);</pre>
<p>repeat()重复某种模式也是可以的。</p>
<pre>grid-template-columns: repeat(2, 50px 50px 80px);</pre>

### 2. auto-fill 关键字

<p>有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充</p>
<pre>grid-template-columns: repeat(auto-fill, 50px);</pre>

### 3. fr 关键字

<p>为了方便表示比例关系，网格布局提供了fr关键字。</p>
<pre>grid-template-columns: 1fr 2fr 3fr;</pre>
<pre>grid-template-columns: 100px 1fr 2fr;</pre>

### 4. minmax()

<p>minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。</p>
<pre>grid-template-columns: 0.5fr 1fr minmax(50px, 1fr);</pre>

### 5. auto 关键字

<p>auto关键字表示由浏览器自己决定长度。</p>
<pre>grid-template-columns: 50px auto 100px;</pre>

### 6. 网格线的名称

<p>grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。</p>
<pre>grid-template-columns: [c1] 50px [c2] 50px [c3] auto [c4];</pre>
<pre>grid-template-rows: [r1] 50px [r2] 50px [r3] auto [r4];</pre>

### 7. 布局实例

<p>grid-template-columns属性对于网页布局非常有用。</p>
<p>两栏式布局：</p>
<pre>grid-template-columns: 40% 60%;</pre>
<p>十二网格布局：</p>
<pre>grid-template-columns: repate(12, 1fr);</pre>