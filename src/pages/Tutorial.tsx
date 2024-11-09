import { Box, Button, Divider, Tab, Tabs, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useClient } from '../context/ClientContext'
import { usePreference } from '../context/PreferenceContext'
import { useState } from 'react'
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer'

const tabs = ['パスワードとログイン', '投稿', 'フォローとウォッチ', 'コミュニティ', 'リスト', 'カスタマイズ', '完了！']

export function Tutorial(): JSX.Element {
    const { t } = useTranslation('', { keyPrefix: 'tutorial' })
    const { client } = useClient()

    const [progress, setProgress] = usePreference('tutorialProgress')
    const [page, setPage] = useState(progress)

    const goNext = (): void => {
        setPage(page + 1)
        if (page + 1 > progress) setProgress(page + 1)
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100%',
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    paddingX: 1,
                    paddingTop: 1
                }}
            >
                <Typography variant="h2">チュートリアル {`(${progress + 1}/${tabs.length})`}</Typography>
                <Divider />
                <Tabs
                    value={page}
                    onChange={(_, value) => {
                        setPage(value)
                    }}
                    variant="scrollable"
                >
                    {tabs.map((label, index) => (
                        <Tab key={index} label={label + (progress > index ? '✅' : '')} />
                    ))}
                </Tabs>
                <Divider />
                <Box
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4
                    }}
                >
                    {page === 0 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# パスワードとログイン

コンカレントでは、ログインするときに自分で決めるパスワードではなく、決まったパスワードを使います。このパスワードは非常に重要な為、「マスターキー」と呼ばれています。マスターキーは、他人に知られてしまうと取り返しがつかないことになるので、絶対に他人に教えないでください。

また、マスターキーを忘れてしまった場合、再設定することはできず、アカウントを新しく作り直す必要があります。そのため、マスターキーは印刷したりメモしたりして、貴重品として大切に保管してください。

## ログイン

ログインは、トップページのログイン画面からマスターキーを入力して行います。
他にも、QRコードを使ったログイン方法もあります。

すでにログイン済みの端末の設定>ログインQRからQRコードを表示させ、新しい端末でQRコードを読み取ります。

### 特権モード

コンカレントでは、マスターキーを入力してログインすると、特権モードでログインされます。
特権モードでは、アカウントの引っ越しや削除など、重要な操作が行えるモードです。

特権モードである必要がない場合は、画面上部の「特権モード」をクリックすることで通常モードに切り替えることができます。

通常モードから特権モードに切り替えるには、一度ログアウトして再度マスターキーを入力してログインする必要があります。

## より詳しく知りたい人へ

<details>
<summary> より詳しい説明 </summary>

コンカレントには二種類のパスワードがあります。一つは「マスターキー」、もう一つは「サブキー」です。

これは、いわゆる実印とシャチハタのような関係です。

コンカレントでは、自分の投稿にデジタルな印鑑を押して、自分の投稿であることを証明しています。

しかし、実印は契約したり銀行からお金を引き下ろしたりなど、非常に強い権限を持っています。これを荷物の受け取りには使いませんよね。

これと同じように、コンカレントでも引っ越しやアカウントの削除などを行う場合はマスターキー、投稿やフォローなどの日常的な操作にはサブキーを使う仕組みになっています。

マスターキーは一度他人に知られてしまえば一巻の終わりですが、サブキーはいつでもその効力を取り消すことができます。

</details>

`}
                                emojiDict={{}}
                            />
                            {client.api.ckid ? (
                                <Button
                                    onClick={() => {
                                        goNext()
                                    }}
                                >
                                    次へ
                                </Button>
                            ) : (
                                <Button disabled>次へ進む前に、特権モードから通常モードへ切り替えてみましょう。</Button>
                            )}
                        </>
                    )}

                    {page === 1 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# 投稿

デスクトップではデフォルトで画面上部に投稿UIがあります。スマートフォンでは右下のボタンを押すことで投稿画面を表示することができます。

まずは試しに1つ投稿してみましょう。

## 装飾とプレビュー

コンカレントでは、投稿に記号を使うことで装飾を行うことができます。

例えば、\`**太字**\`と書くことで**太字**にすることができます。

実際に記法がどのように表示されるかは、投稿画面の下部のプレビューでリアルタイムに確認することができます。

## 記法の一覧

- \`# 見出し\`: 見出し (#の数で大きさが変わります)
- \`**太字**\`: **太字**
- \`*斜体*\`: *斜体*
- \`~~取り消し線~~\`: ~~取り消し線~~

`}
                                emojiDict={{}}
                            />
                            <Button
                                onClick={() => {
                                    goNext()
                                }}
                            >
                                次へ
                            </Button>
                        </>
                    )}

                    {page === 2 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# フォローとウォッチ

コンカレントではいわゆる「フォロー」が、一般的なSNSとは異なる仕組みになっています。
コンカレントでの「フォロー」は、いわゆる「連絡先に追加」のようなものです。知ってる人・興味のある人は積極的にフォローしてみましょう。

一方、「ウォッチ」は、その人を特定のリストに追加し、その人の投稿すべてを見るためのものです。

コンカレントはコミュニティベースなSNSでもあるので、いろんな人を直接ウォッチしてしまうと、タイムラインが雑多に埋まってしまいがちです。
ウォッチは本当に興味のある人だけにするのがおすすめです。

`}
                                emojiDict={{}}
                            />
                            <Button
                                onClick={() => {
                                    goNext()
                                }}
                            >
                                次へ
                            </Button>
                        </>
                    )}

                    {page === 3 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# コミュニティ

コンカレントにはコミュニティタイムラインがあります。
コミュニティタイムラインは「探索」タブから探すことができます。1つみつけてみましょう。無ければ、新しく自分で作ってみるのもいいですね。

みつけたら、\`三+\`ボタンを押すことで、そのコミュニティをリストに追加する(ウォッチする)ことができます。

## コミュニティへの投稿

コミュニティをリストに追加していると、普段の投稿UIの投稿先一覧にその候補が追加されます。投稿先はいくつも選ぶことができます。

\\<図\\>

## デフォルト投稿先の設定

自分の腰を据えるコミュニティがあれば、そのコミュニティをデフォルト投稿先に設定しておくと便利でしょう。
リストを表示した状態で、右上のiボタンを押すことで、デフォルト投稿先の設定を行うことができます。

`}
                                emojiDict={{}}
                            />
                            <Button
                                onClick={() => {
                                    goNext()
                                }}
                            >
                                次へ
                            </Button>
                        </>
                    )}

                    {page === 4 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# リスト

複数コミュニティをウォッチしていると、タイムラインが雑多になりすぎてしまうことがあります。
そういう時は、リストを増やして整理しましょう。 メニューの「リスト」からリストの管理画面を開くことができます。

## リストのピン止め

リスト設定から特定のリストをピン止めすることができます。ピン止めをすると、画面上部のタブからいつでもそのリストにアクセスすることができます。

## プリセットとしてのリスト

コンカレントのリストはただまとめるだけではなく、プリセットとして強力に機能します。
たとえば、複数のリストにそれぞれ別のデフォルト投稿先を設定しておくことで、素早く投稿先を切り替えることができます。


`}
                                emojiDict={{}}
                            />
                            <Button
                                onClick={() => {
                                    goNext()
                                }}
                            >
                                次へ
                            </Button>
                        </>
                    )}

                    {page === 5 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# カスタマイズ

コンカレントでは、様々なカスタマイズ機能があります。

## カラーテーマ
コンカレントのカラーテーマは、設定画面のテーマから変更することができます。また、自分で新しいテーマを作成することも、そしてそのテーマを共有することもできます。
共有されたテーマはタイムライン上でこのように表示されます。
\`\`\`theme
{"meta":{"name":"おりーぶ","author":"con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2"},"palette":{"primary":{"main":"#292e24","contrastText":"#ffffff"},"secondary":{"main":"#265E2C"},"background":{"default":"#12a129","paper":"#fffcfa","contrastText":"#292e24"},"text":{"primary":"#292e24","secondary":"#265E2C","hint":"rgba(41, 46, 36, 0.5)","disabled":"rgba(41, 46, 36, 0.5)"},"divider":"rgba(41, 46, 36, 0.12)"},"components":{"MuiButton":{"defaultProps":{"variant":"contained","disableElevation":false}},"MuiPaper":{"defaultProps":{"variant":"elevation"}},"MuiAppBar":{"defaultProps":{"color":"primary"}}}}
\`\`\`

テーマのインストールボタンを押すことで、すぐにそのテーマを適用することができます。

## 絵文字パック

コンカレントでは投稿の本文やリアクションとして絵文字を使うことができますが、この絵文字は絵文字パックをインストールすることで追加することができます。

共有された絵文字パックはタイムライン上でこのように表示されます。実際にクリックして、絵文字パックをインストールしてみましょう。

<emojipack src="https://emojis.worldfile.cc/worldpack/emojis.json"></emojipack>

また、少し手間が必要ですが、自分で絵文字パックを作成することもできます。詳細は[こちら]()を参照してください。


`}
                                emojiDict={{}}
                            />
                            <Button
                                onClick={() => {
                                    goNext()
                                }}
                            >
                                次へ
                            </Button>
                        </>
                    )}

                    {page === 6 && (
                        <>
                            <MarkdownRenderer
                                messagebody={`
# 完了！

これで、コンカレントの基本的な使い方をマスターしました！

これからは、自分の好きなようにコンカレントを使ってみてください。


## その他の機能

### サブプロフィール
コンカレントでは、自分のプロフィールを複数作ることができます。投稿する際に、どのプロフィールで投稿するか選ぶことができます。

### Activitypubとの連携
コンカレントでは、Activitypub連携を有効化することで、ほかのActivitypubに対応したSNS(Mastodon, Misskey, Pleromaなど)と連携することができます。

### データ管理と引っ越し
コンカレントは分散型SNSです。自分のデータを自分で管理することができます。
サーバーがいつ消滅してもいいように、定期的に「設定>データ管理」からデータをエクスポートして、自分の手元に保存しておくと安心です。
また、自分がいるサーバーがサービス終了するときは、ほかのサーバーに引っ越すことができます。

`}
                                emojiDict={{}}
                            />
                        </>
                    )}
                </Box>
            </Box>

            <Button
                onClick={() => {
                    setProgress(0)
                }}
            >
                dev: チュートリアルをリセット
            </Button>
        </Box>
    )
}
