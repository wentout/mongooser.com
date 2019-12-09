(ns user
  (:use [figwheel-sidecar.repl-api :as ra]))

(defn start [] (ra/start-figwheel!))

(defn stop [] (ra/stop-figwheel!))

(defn cljs [] (ra/cljs-repl "dev"))

(comment
  (let [codes [27 91 49 74]]
    #_(map #(format "%x" %) codes)
    (String. (int-array codes) 0 (count codes)))
)
